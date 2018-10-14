#!/bin/sh

# Update system

yum update -y

# create necessary directories
mkdir /root/minikube_setup/
cd /root/minikube_setup/

# install docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Disable swapoff

swapoff -a

# Install Kubectl binary

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF

yum install -y kubectl

# Install minikube

curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.30.0/minikube-linux-amd64 && chmod +x minikube && cp minikube /usr/local/bin/ && rm -f minikube

# Start minikube
minikube start --vm-driver=none --apiserver-ips 127.0.0.1 --apiserver-name localhost

# Check minikube status
minikube status
