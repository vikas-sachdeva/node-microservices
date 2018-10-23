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

printf "Performing update..."
yum update -y

printf "Installing git..."
yum install -y git

printf "Cloning source code..."
cd /root/
git clone https://github.com/vikas-sachdeva/node-microservices.git

printf "Building docker images..."

cd node-microservices/subscription-service/
docker build --no-cache ./ -t subscription-service:1.0

if [[ $? -ne 0 ]]; then
    printf "Failed to build subscription-service docker image."
	exit -1
fi

cd ..
cd payment-service/
docker build --no-cache ./ -t payment-service:1.0

if [[ $? -ne 0 ]]; then
    printf "Failed to build payment-service docker image."
	exit -1
fi

cd ..
cd auth-service/
docker build --no-cache ./ -t auth-service:1.0

if [[ $? -ne 0 ]]; then
    printf "Failed to build auth-service docker image."
	exit -1
fi

printf "Adding services to kubectl..."
kubectl apply -f /root/node-microservices/subscription-service/subscription-service.yaml

if [[ $? -ne 0 ]]; then
    printf "Error occurred while adding subscription-service to kubectl."
	exit -1
fi

kubectl apply -f /root/node-microservices/payment-service/payment-service.yaml

if [[ $? -ne 0 ]]; then
    printf "Error occurred while adding payment-service to kubectl."
	exit -1
fi

kubectl apply -f /root/node-microservices/payment-gateway-service/payment-gateway-service.yaml

if [[ $? -ne 0 ]]; then
    printf "Error occurred while adding payment-gateway-service to kubectl."
	exit -1
fi

kubectl apply -f /root/node-microservices/auth-service/auth-service.yaml

if [[ $? -ne 0 ]]; then
    printf "Error occurred while adding auth-service to kubectl."
	exit -1
fi

kubectl apply -f /root/node-microservices/ambassador/ambassador.yaml

if [[ $? -ne 0 ]]; then
    printf "Error occurred while adding ambassador to kubectl."
	exit -1
fi

printf "Getting ambassador URL..."
URL=`minikube service ambassador --url`

sh app_testing.sh $URL