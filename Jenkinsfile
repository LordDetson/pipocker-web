pipeline {
  agent any
  stages {
    stage ('Build pipoker-web image') {
      steps {
        sh 'docker build -t pipoker-web .'
      }
    }
    stage ('Run pipoker-web') {
      steps {
        sh 'docker run -d --network pipokernet -p 80:80 --name pipoker-web pipoker-web:latest'
      }
    }
  }
}
