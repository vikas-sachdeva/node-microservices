#!/bin/sh

if [ "$(whoami)" != "root" ]; then
    printf "Run this script as root user"
    exit -1
fi

# check if the OS is centos
OS=$(awk -F ' ' '{print $1}' /etc/centos-release)
OS_VER=$( awk -F ' ' '{print $4}' /etc/centos-release | awk -F '.' '{print $1}')
if [[ "$OS" != "CentOS" ]] || [[ "$OS_VER" != "7" ]]; then
    printf "The installation script only supports CentOS 7.x"
    exit -1
fi

systemctl status firewalld >> /dev/null

if [[ $? -ne 3 ]]; then
    printf "Stopping and disabling firewalld..."
        systemctl disable firewalld
        printf "Rebooting system in 5 seconds. Please run this script after reboot."
        sleep 5
        reboot
        exit 0
fi

SELINUX_STATUS=`grep SELINUX=disabled /etc/selinux/config | wc -l`
if [[ SELINUX_STATUS -ne 1 ]]; then
    printf "Disabling SELINUX ..."
        sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
		sed -i 's/SELINUX=permissive/SELINUX=disabled/g' /etc/selinux/config
        printf "Rebooting system in 5 seconds. Please run this script after reboot."
        sleep 5
        reboot
        exit 0
fi

printf "Performing update..."

yum update -y

printf "Creating required directories..."
mkdir /root/minikube_setup/

if [[ $? -ne 0 ]]; then
    printf "Failed to create directory /root/minikube_setup/"
        exit -1
fi

cd /root/minikube_setup/

# install docker
docker=$(which docker)
if [[ ! -z "$docker" ]]; then
    printf "Docker has already been installed.\n"
else
        printf "Installing docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        systemctl start docker
        systemctl enable docker
fi

printf "Disabling swapoff..."
swapoff -a

printf "Installing Kubectl binary..."

if [[ -f /etc/yum.repos.d/kubernetes.repo ]]; then
	printf "kubernetes repo is already setup"
else
	cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF

fi

yum install -y kubectl

printf "Installing minikube..."

curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.30.0/minikube-linux-amd64 && chmod +x minikube && cp minikube /usr/local/bin/ && rm -f minikube

printf "Starting minikube..."
minikube start --vm-driver=none --apiserver-ips 127.0.0.1 --apiserver-name localhost

if [[ $? -ne 0 ]]; then
    printf "Error occurred while starting minikube."
        exit -1
	else
		printf "minikube started successfully.\n"
fi

printf "Checking minikube status..."
minikube status

printf "Checking minikube services..."
minikube get services

printf "Checking minikube deployment..."
minikube get deployment

printf "Checking minikube pods..."
minikube get pods
