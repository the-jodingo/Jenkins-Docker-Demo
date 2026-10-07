[![CI](https://github.com/the-jodingo/Jenkins-Docker-Demo/actions/workflows/ci.yml/badge.svg)](https://github.com/the-jodingo/Jenkins-Docker-Demo/actions/workflows/ci.yml)
[![Jenkins](https://img.shields.io/badge/CI-Jenkins-D24939?logo=jenkins&logoColor=white)](Jenkinsfile)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](docker-compose.yml)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-manifests-326CE5?logo=kubernetes&logoColor=white)](k8s/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![CodeQL](https://img.shields.io/badge/CodeQL-enabled-2088FF?logo=github&logoColor=white)](.github/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# Jenkins Docker Demo

Two Node.js microservices built, tested, and shipped by a Jenkins pipeline:
parallel test and build stages, images pushed to a registry, then deployed with
Docker Compose. Kubernetes manifests included.

## Table of contents

- [Services](#services)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [API reference](#api-reference)
- [The Jenkins pipeline](#the-jenkins-pipeline)
- [Kubernetes](#kubernetes)
- [Testing and CI](#testing-and-ci)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Services

| Service | Port | Purpose |
|---|---|---|
| `user-service` | 3000 | Serves users |
| `product-service` | 3001 | Serves products and users |

## Requirements

| Tool | Version |
|---|---|
| Node.js | 18 or 20 |
| Docker + Compose | any recent |
| Jenkins | for the pipeline |
| kubectl | for the k8s manifests |

## Quick start

```bash
git clone https://github.com/the-jodingo/Jenkins-Docker-Demo.git
cd Jenkins-Docker-Demo
docker compose up -d
```

```bash
curl localhost:3000/api/users
curl localhost:3001/api/products
docker compose down
```

Run a service directly without Docker:

```bash
cd services/user-service
npm install
npm start
```

## API reference

### user-service — `:3000`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/users` | All users |
| `GET` | `/api/users/:id` | One user, or `404` |
| `GET` | `/health` | `{"status":"healthy","service":"user-service"}` |

### product-service — `:3001`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | All products |
| `GET` | `/api/users` | All users |
| `GET` | `/api/users/:id` | One user, or `404` |
| `GET` | `/health` | `{"status":"healthy","service":"product-service"}` |

## The Jenkins pipeline

`Jenkinsfile` runs:

1. **Checkout**
2. **Build & test both services in parallel** — `npm install`, `npm test`
3. **Build & push images in parallel** — tagged with `$BUILD_NUMBER` and `latest`
4. **Deploy** — `docker compose up -d`
5. **Post** — reports success or failure

### Required credential

Create a Jenkins credential with the ID **`dockerhub-cred`** of type
*Username with password* (Docker Hub username + access token). The pipeline
exposes it as `DOCKERHUB_CREDENTIALS` and derives the registry from the username.

## Kubernetes

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/user-service/
kubectl apply -f k8s/product-service/
kubectl apply -f k8s/ingress.yaml
```

## Testing and CI

```bash
cd services/user-service && npm test
cd services/product-service && npm test
```

GitHub Actions runs on every push and PR:

- **Test** — jest + supertest for each service, in a matrix
- **Validate docker-compose** — `docker compose config -q`
- **CodeQL** — static analysis via `.github/workflows/codeql.yml`

## Project structure

```
Jenkins-Docker-Demo/
├── services/
│   ├── user-service/       # server.js, server.test.js, package.json
│   └── product-service/    # server.js, server.test.js, package.json
├── k8s/                    # namespace, ingress, per-service manifests
├── docker-compose.yml
├── Jenkinsfile
└── .github/workflows/      # ci.yml, codeql.yml
```

## Contributing

Branch from `master`, add tests for behaviour changes, run `npm test` in the
service you touched, then open a PR.

## License

[MIT](LICENSE) © Joash Odingo
