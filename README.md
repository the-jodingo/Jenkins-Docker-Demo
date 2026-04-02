# 🚀 Jenkins Microservices CI/CD Pipeline Demo

**Hands-on DevOps Project** – Build, Test, Containerize & Deploy **two Node.js microservices** using a **multi-stage Jenkins Pipeline**.

Perfect for all in one devops. I added a bonus k8s, its not necessary but you can try and polish it too if you want to.

![CI/CD Status](https://img.shields.io/badge/CI%2FCD-Jenkins-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-by-step-setup)
- [How the Pipeline Works](#how-the-pipeline-works) { Checkout → Parallel (Build + Test User + Product) → Parallel (Docker Build + Push) → Deploy }
- [Run Locally](#run-locally)
- [Learning Outcomes](#learning-outcomes)
- [Troubleshooting](#troubleshooting)

# 1. 📖 Project Overview
Two independent microservices:
- **User Service** → `/api/users` (port 3000)
- **Product Service** → `/api/products` (port 3001)

Jenkins automates everything in a **multi-stage pipeline**:
1. Checkout
2. Build & Test (parallel)
3. Docker Build & Push (parallel)
4. Deploy (docker-compose)

## 2. 🏗️ Architecture

jenkins-microservices-cicd-demo/
├── README.md
├── Jenkinsfile
├── docker-compose.yml
├── .gitignore
├── services/
│   ├── user-service/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── server.js
│   │   └── __tests__/
│   │       └── server.test.js
│   └── product-service/
│       ├── Dockerfile
│       ├── package.json
│       ├── server.js
│       └── __tests__/
│           └── server.test.js
└── k8s/                     # (Bonus - for advanced learning)
    ├── deployment-user.yaml
    ├── deployment-product.yaml
    └── service.yaml

  # 3 GitHub → Jenkins (multi-stage pipeline)
├── User Service → Docker Image → Docker Hub
└── Product Service → Docker Image → Docker Hub

↓## ✅ Prerequisites
- Docker & Docker Compose installed
- Jenkins (recommended: run via Docker)
- GitHub account + Docker Hub account
- Basic knowledge of terminals

# Step 4: Run Jenkins (Easiest Way)
   docker run -d -p 8080:8080 -p 50000:50000 \
   -v jenkins_home:/var/jenkins_home \
   --name jenkins jenkins/jenkins:lts-jdk17
   
Open http://localhost:8080
Unlock Jenkins (password in container logs: docker logs jenkins)
Install suggested plugins
Create admin user

# Step 5: Add Docker Hub Credentials in Jenkins

Jenkins → Manage Jenkins → Credentials
Add new credential → Kind: Username with password
ID: dockerhub-cred
Username: your Docker Hub username
Password: your Docker Hub password


# Step 6: Create Pipeline Job

New Item → Pipeline → Name: microservices-cicd
Pipeline → Pipeline script from SCM
SCM: Git → Repository URL: your repo
Branch: main
Script Path: Jenkinsfile
Save

# Step 7: Run the Pipeline
Push code → Jenkins auto-triggers (or click Build Now)

# Step 8: Access Services
After deploy:

User Service: http://localhost:3000/api/users
Product Service: http://localhost:3001/api/products

# 🐞 Troubleshooting

"docker: not found" → Use Jenkins with Docker-in-Docker or install Docker on host
Permission issues → sudo usermod -aG docker $USER
Pipeline fails on test → Check Jest in services
   
