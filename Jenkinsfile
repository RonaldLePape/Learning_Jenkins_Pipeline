pipeline {
    agent {
        docker {
            image 'node:20-alpine'
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Start App & Test URL') {
            steps {
                sh '''
                    apk add --no-cache curl

                    node app.js > app.log 2>&1 &
                    APP_PID=$!

                    for i in $(seq 1 10); do
                      curl -f http://localhost:3001 && break
                      sleep 2
                    done

                    kill $APP_PID
                '''
            }
        }
    }
}