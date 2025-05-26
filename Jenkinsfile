pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'quizzlearn-api'
        DOCKER_TAG = "${BUILD_NUMBER}"
        VM_NAME = 'quizzlearn-api'
        ZONE = 'us-central1-a'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Copy necessary files to VM
                    sh "gcloud compute scp docker-compose.yml ${VM_NAME}:~/ --zone=${ZONE}"
                    sh "gcloud compute scp .env ${VM_NAME}:~/ --zone=${ZONE}"
                    
                    // SSH into VM and deploy
                    sh """
                        gcloud compute ssh ${VM_NAME} --zone=${ZONE} --command='
                            # Build the Docker image locally
                            docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                            
                            # Stop existing containers
                            docker-compose down
                            
                            # Update docker-compose.yml with new image
                            sed -i "s|image: .*|image: ${DOCKER_IMAGE}:${DOCKER_TAG}|" docker-compose.yml
                            
                            # Start new containers
                            docker-compose up -d
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 