pipeline {
  agent any
  stages {
    stage ('Build pipoker-web image') {
      steps {
        sh 'docker build -t pipoker-web .'
      }
    }
    stage ('Run pipoker-web') {
      environment {
        CONTAINER_NAME = "pipoker-web"
        IMAGE_NAME = "pipoker-web"
        APP_PORT = "80"
      }
      steps {
        sh "docker rm -f $CONTAINER_NAME"
        sh "docker rmi $IMAGE_NAME"
        sh 'docker run -d --name $CONTAINER_NAME -p $APP_PORT:$APP_PORT --network pipokernet $IMAGE_NAME'
      }
    }
  }
}
