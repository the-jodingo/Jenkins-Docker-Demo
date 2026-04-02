# 🚀 Jenkins Microservices CI/CD Pipeline Demo

**Hands-on DevOps Project** – Build, Test, Containerize & Deploy **two Node.js microservices** using a **multi-stage Jenkins Pipeline**.

Perfect for resumes, GitHub profile pinning, and DevOps interviews!

![CI/CD Status](https://img.shields.io/badge/CI%2FCD-Jenkins-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-by-step-setup)
- [How the Pipeline Works](#how-the-pipeline-works)
- [Run Locally](#run-locally)
- [Learning Outcomes](#learning-outcomes)
- [Troubleshooting](#troubleshooting)

## 📖 Project Overview
Two independent microservices:
- **User Service** → `/api/users` (port 3000)
- **Product Service** → `/api/products` (port 3001)

Jenkins automates everything in a **multi-stage pipeline**:
1. Checkout
2. Build & Test (parallel)
3. Docker Build & Push (parallel)
4. Deploy (docker-compose)

## 🏗️ Architecture
