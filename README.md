# Learning_Jenkins_Pipeline
CI/CD with Jenkins : building, testing and deploying a NodeJS app.

## Setup / architecture

- **App**: a simple NodeJs app
- **Runtime**: app runs in a Node container, deployed in Kubernetes
- **CI/CD**:
  - Jenkins is deployed "over kubernetes" with Helm chart : Jenkins agents are dynamic pods
  - **ESLint** for linting
  - **SonarQube** for security and quality
  - **Kaniko** for build & push to **DockerHub**
