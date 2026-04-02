
#### 2. `Jenkinsfile`

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
