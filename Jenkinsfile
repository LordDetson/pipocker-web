pipeline {
  agent any
  stages {
    stage ('Install node modules') {
      steps {
        sh 'npm install'
      }
    }
    stage ('Build pipoker-web') {
      steps {
        sh 'npm run build:ssr'
      }
    }
  }
}
