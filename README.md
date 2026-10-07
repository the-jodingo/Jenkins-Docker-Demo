[![Jenkins](https://img.shields.io/badge/CI-Jenkins-D24939?logo=jenkins&logoColor=white)](https://www.jenkins.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-manifests-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![CodeQL](https://img.shields.io/badge/CodeQL-enabled-2088FF?logo=github&logoColor=white)](.github/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# Jenkins Docker Demo

A two-service Node.js application built and shipped by a Jenkins pipeline:
parallel test and build stages, Docker images pushed to a registry, then
deployed with Docker Compose.

## Services

| Service | Port | Endpoints |
|---|---|---|
| `user-service` | 3000 | `GET /api/users`, `GET /api/users/:id`, `GET /health` |
| `product-service` | 3001 | `GET /api/products`, `GET /api/users`, `GET /api/users/:id`, `GET /health` |

## Pipeline

`Jenkinsfile` runs:

1. **Checkout**
2. **Build & test both services in parallel** (`npm install`, `npm test`)
3. **Build & push images in parallel** — tagged with the build number and `latest`
4. **Deploy** with `docker compose up -d`
5. **Post** — reports success/failure

### Required Jenkins credential

Create a Jenkins credential with the ID **`dockerhub-cred`**
(Username with password — your Docker Hub username and access token).
The pipeline reads it as `DOCKERHUB_CREDENTIALS` and derives the registry
from the username.

## Run locally

```bash
docker compose up -d
curl localhost:3000/api/users
curl localhost:3001/api/products
docker compose down
```

## Kubernetes

The `k8s/` directory holds namespace, ingress, and per-service
deployment/service manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/user-service/
kubectl apply -f k8s/product-service/
```

## Security

`.github/workflows/codeql.yml` runs CodeQL static analysis on pushes and PRs.

## License

MIT
