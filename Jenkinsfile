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
                          curl -f http://localhost:3001 && exit 0
                          sleep 2
                        done

                        kill $APP_PID
                        exit 1
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