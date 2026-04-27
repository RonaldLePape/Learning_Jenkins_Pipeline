pipeline {
    agent {
    kubernetes {
        yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node
      image: node:20-alpine
      command:
        - cat
      tty: true
'''
    }
}

    stages {
        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh 'npm ci'
                }
            }
        }

        stage('Start App & Test URL') {
            steps {
                container('node') {
                    sh '''
                        apk add --no-cache curl

                        node app.js > app.log 2>&1 &
                        APP_PID=$!

                        for i in $(seq 1 10); do
                        if curl -f http://localhost:3001; then
                            kill $APP_PID || true
                            exit 0
                        fi

                        echo "App not ready yet..."
                        cat app.log || true
                        sleep 2
                        done

                        echo "App failed to start. Logs:"
                        cat app.log || true

                        kill $APP_PID || true
                        exit 1
                    '''
                }
            }
        }
    }

    stage('Docker Login') {
        steps {
            container('node') {   // keep this since you're using K8s agent
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
    }
}