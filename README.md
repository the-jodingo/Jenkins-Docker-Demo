[README.md](https://github.com/user-attachments/files/26448340/README.md)

# 🚀 Jenkins Microservices CI/CD Pipeline Project

**Hands-on DevOps Project** 

- Build, Test, Containerize & Deploy **two Node.js microservices**
- Use a **multi-stage Jenkins Pipeline**.

Perfect for resumes, GitHub profile pinning, and DevOps interviews!

![CI/CD Status](https://img.shields.io/badge/CI%2FCD-Jenkins-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![License](https://img.shields.io/badge/License-MIT-green)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-green)

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-by-step-setup)
- [Learning Outcomes](#learning-outcomes)
- [Troubleshooting](#troubleshooting)


## 🏗️ Architecture

GitHub → Jenkins Pipeline 

>> User Service → Docker Image → Docker Hub
>> Product Service → Docker Image → Docker Hub
>>>
docker-compose up.


## Appendix

Additional information for Setup.


## 🛠️ Tech Stack
- **Microservices**: Node.js + Express
- **CI/CD**: Jenkins (Declarative Pipeline)
- **Containerization**: Docker (multi-stage)
- **Orchestration**: Docker Compose + Kubernetes manifests (bonus)
- **Testing**

## ✅ Prerequisites
- Docker & Docker Compose installed
- Jenkins (recommended: run via Docker)
- GitHub account + Docker Hub account
- Basic knowledge of terminals

## 🚀 Step-by-Step Setup

### Step 1: Clone & Setup Repo
```bash
git clone https://github.com/YOUR-USERNAME/jenkins-microservices-cicd-demo.git

cd jenkins-microservices-cicd-demo.


## Jenkins deploy

- To deploy this Jenkins

```bash

 docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins jenkins/jenkins:lts-jdk17
  
```

- Open http://localhost:8080

- Unlock Jenkins (password in container logs: docker logs jenkins)

- Install suggested plugins

- Create admin user

Step 3: Add Docker Hub Credentials in Jenkins

Jenkins → Manage Jenkins → Credentials
Add new credential → Kind: Username with password
ID: dockerhub-cred
Username: your Docker Hub username
Password: your Docker Hub password


Step 4: Create Pipeline Job

New Item → Pipeline → Name: microservices-cicd
Pipeline → Pipeline script from SCM
SCM: Git → Repository URL: your repo
Branch: main
Script Path: Jenkinsfile
Save

Step 5: Run the Pipeline

Push code → Jenkins auto-triggers (or click Build Now)

Step 6: Access Services

After deploy:

User Service: http://localhost:3000/api/users
Product Service: http://localhost:3001/api/products


## Jenkins-file 


```groovy
pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        DOCKER_REGISTRY = "${DOCKERHUB_CREDENTIALS_USR}"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                echo '✅ Code checked out'
            }
        }

        stage('Build & Test Services (Parallel)') {
            parallel {
                stage('User Service') {
                    steps {
                        dir('services/user-service') {
                            sh 'npm install'
                            sh 'npm test'
                            echo '✅ User Service built & tested'
                        }
                    }
                }
                stage('Product Service') {
                    steps {
                        dir('services/product-service') {
                            sh 'npm install'
                            sh 'npm test'
                            echo '✅ Product Service built & tested'
                        }
                    }
                }
            }
        }

        stage('Build & Push Docker Images (Parallel)') {
            parallel {
                stage('User Service Docker') {
                    steps {
                        dir('services/user-service') {
                            sh "docker build -t ${DOCKER_REGISTRY}/user-service:${IMAGE_TAG} ."
                            sh "docker tag ${DOCKER_REGISTRY}/user-service:${IMAGE_TAG} ${DOCKER_REGISTRY}/user-service:latest"
                            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                            sh "docker push ${DOCKER_REGISTRY}/user-service:${IMAGE_TAG}"
                            sh "docker push ${DOCKER_REGISTRY}/user-service:latest"
                            echo '✅ User Service image pushed'
                        }
                    }
                }
                stage('Product Service Docker') {
                    steps {
                        dir('services/product-service') {
                            sh "docker build -t ${DOCKER_REGISTRY}/product-service:${IMAGE_TAG} ."
                            sh "docker tag ${DOCKER_REGISTRY}/product-service:${IMAGE_TAG} ${DOCKER_REGISTRY}/product-service:latest"
                            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                            sh "docker push ${DOCKER_REGISTRY}/product-service:${IMAGE_TAG}"
                            sh "docker push ${DOCKER_REGISTRY}/product-service:latest"
                            echo '✅ Product Service image pushed'
                        }
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh "IMAGE_TAG=${IMAGE_TAG} DOCKER_REGISTRY=${DOCKER_REGISTRY} docker-compose up -d --pull always"
                echo '🚀 Services deployed!'
                sh 'docker-compose ps'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished 🎉'
        }
        success {
            echo '✅ SUCCESS - Everything deployed!'
        }
    }
}
