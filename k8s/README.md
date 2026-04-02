# Kubernetes Deployment Guide 

This folder contains ready-to-apply Kubernetes manifests for the two microservices.

## Prerequisites
- Kubernetes cluster (Minikube, Kind, Docker Desktop Kubernetes, or any cloud cluster like GKE/EKS/AKS)
- `kubectl` configured
- Docker images already pushed to Docker Hub (`user-service` and `product-service`)

## Step-by-Step Deployment

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Deploy User Service
kubectl apply -f k8s/user-service/

# 3. Deploy Product Service
kubectl apply -f k8s/product-service/

# 4. (Optional) Deploy Ingress
kubectl apply -f k8s/ingress.yaml

# Usefull Commands

# Check everything
kubectl get all -n microservices-demo

# View logs
kubectl logs -f deployment/user-service -n microservices-demo

# Scale up
kubectl scale deployment/user-service --replicas=4 -n microservices-demo

# Delete everything
kubectl delete -f k8s/ --all
