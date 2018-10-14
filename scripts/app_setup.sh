#!/bin/sh

# install git
yum install -y git

# Clone source code
cd /root/
git clone https://github.com/vikas-sachdeva/node-microservices.git

# Build docker images
cd node-microservices/subscription-service/
docker build --no-cache ./ -t subscription-service:1.0

cd ..
cd payment-service/
docker build --no-cache ./ -t payment-service:1.0

cd ..
cd auth-service/
docker build --no-cache ./ -t auth-service:1.0

# Add services

kubectl apply -f /root/node-microservices/subscription-service/subscription-service.yaml
kubectl apply -f /root/node-microservices/payment-service/payment-service.yaml
kubectl apply -f /root/node-microservices/auth-service/auth-service.yaml
kubectl apply -f /root/node-microservices/ambassador/ambassador.yaml

# Get URL
minikube service ambassador --url