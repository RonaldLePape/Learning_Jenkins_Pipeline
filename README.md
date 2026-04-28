# Learning_Jenkins_Pipeline
CI/CD with Jenkins : building, testing and deploying a NodeJS app.

## Setup / architecture

- **App**: a simple NodeJs app
- **Runtime**: app runs in a Node container, deployed in Kubernetes
- **CI/CD**:
  - Jenkins is deployed "over kubernetes" with Helm chart : Jenkins agents are dynamic pods
  - Linting with **ESLint**
  - Security and Quality with **SonarQube**
  - **Kaniko** is used to build & push Docker image to **DockerHub**
