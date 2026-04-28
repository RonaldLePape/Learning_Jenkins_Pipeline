# Learning_Jenkins_Pipeline
CI/CD with Jenkins : building, testing and deploying a NodeJS app.

## Setup / architecture

- **Ubuntu 24.04 LTS** as a vm in WSL (Windows Services for Linux)
- **App**: a simple NodeJs app
- **Runtime**: app runs in a Node container, deployed in Kubernetes
- **CI/CD**:
  - **Jenkins** is deployed "over kubernetes" with Helm chart : Jenkins agents are dynamic pods
  - **ESLint** for linting
  - **SonarQube** for security and quality
  - **Kaniko** for build & push
  - **DockerHub** for image hosting
