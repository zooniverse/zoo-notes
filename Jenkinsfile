#!groovy

def newImage = null

pipeline {
  agent none

  options {
    quietPeriod(120) // builds happen at least 120 seconds apart
    disableConcurrentBuilds()
  }

  stages {

    stage('Build Docker image') {
      agent any

      environment {
        HEAD_COMMIT = "${GIT_COMMIT}"
      }

      steps {
        script {
          def dockerRepoName = 'zooniverse/zoo-notes'
          def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
          def buildArgs = "--build-arg HEAD_COMMIT ./"
          newImage = docker.build(dockerImageName, buildArgs)
          newImage.inside {
            sh """
              cd /app
              yarn build
            """
          }
        }
      }
    }

    stage('update latest tag') {
      when { branch 'master' }
      agent any

      steps {
        script {
          newImage.push('latest')
          newImage.inside {
            sh """
              cd /app
              yarn deploy
            """
          }
        }
      }
    }
  }
}