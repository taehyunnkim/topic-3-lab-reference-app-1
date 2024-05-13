pipeline {
    agent any

    environment { 
        APP_NAME = 'my-node-app'
        EXPOSE_PORT = 2000
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "docker build . -t ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${env.APP_NAME}"
            }
        }
        stage('Push Image') {
            steps {
                sh 'aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com'
                sh "aws ecr describe-repositories --repository-names ${env.APP_NAME} || aws ecr create-repository --repository-name ${env.APP_NAME}"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${env.APP_NAME}"
            }
        }
        stage('Deploy') {
            steps {
                sh "docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${env.APP_NAME}"
                sh "docker rm -f ${env.APP_NAME} 2> /dev/null || true"
                sh "docker run -d -p '${env.EXPOSE_PORT}:3000' -e DB_URI=${DB_URI} --network odso-network --name ${env.APP_NAME} ${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${env.APP_NAME}"
            }
        }
    }
}