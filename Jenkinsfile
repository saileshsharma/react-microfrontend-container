import groovy.json.JsonSlurper

def CURRENT_VERSION
def SKIP


def getHelmPackageLatestVersion(packageName) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: "${env.HELM_LOGIN}", usernameVariable: 'HELM_USER', passwordVariable: 'HELM_PASSWORD']]) {
        script {
            sh 'helm repo add dcr ${HELM_REGISTRY} --username ${HELM_USER} --password ${HELM_PASSWORD}'
            sh 'helm repo update'
            def versionListAsString = sh(
                    script: "helm search repo ${packageName} -o json",
                    returnStdout: true
            ).trim();

            def versionList = new JsonSlurper().parseText(versionListAsString)

            if (versionList.size() == 0) {
                error("Build failed because helm package ${packageName} does not exist in the repo.")
            }

            return versionList[0].version
        }
    }
}


pipeline {
    agent any

    parameters {
        string name: 'OCTOPUS_SERVER', defaultValue: 'https://octopus.sehlat.io', description: 'Octopus Server for deployment', trim: true
        string name: 'OCTOPUS_DEPLOY_TARGET', defaultValue: 'MY_TARGET', description: 'Octopus deployment target', trim: true
        string name: 'OCTOPUS_PROJECT', defaultValue: 'MY_PROJECT', description: 'Octopus project to be used for deployment', trim: true
        string name: 'OCTOPUS_SPACE', defaultValue: 'MY_SPACE', description: 'Octopus space to be used for deployment', trim: true
    }


    environment {
        DOCKER_BUILDKIT = "1"
        MY_APP_IMAGE_NAME = "my-organisation.docker.pkg.sehlat.io/my-app"
        REGISTRY_URL = "https://my-organisation.docker.pkg.sehlat.io"

        KUBECONFIG_CREDS = credentials('dcr-kubeconfig')
        OCTOPUS_API_KEY = credentials('dcr-octopus')

        HELM_REGISTRY = "https://my-organisation.helm.pkg.sehlat.io"
        HELM_LOGIN = "dcr-helm"
    }

    stages {
        stage('Initialize') {
            agent {
                docker {
                    image 'node:alpine'
                }
            }
            steps {
                script {
                    sh 'node -p "require(\'./package.json\').version"'
                    CURRENT_VERSION = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
                    OCTOPUS_VERSION = "${CURRENT_VERSION}.${BUILD_NUMBER}-${GIT_COMMIT.substring(0, 7)}"
                }
            }
        }



        stage('Test') {
            steps {
                    sh 'DOCKER_BUILDKIT=1 docker build --target unit-tests .'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'DOCKER_BUILDKIT=1 docker build --target sonar-scanner-analysis .'
            }
        }

        stage('Build') {
            steps {
                sh 'DOCKER_BUILDKIT=1 docker build --target build .'
            }
        }

        stage("Production Build and Deploy") {
            when {
                anyOf {
                    branch "master"
                }
                expression { !SKIP }
            }

            stages {
                stage('Build production image') {
                    steps {
                        sh "DOCKER_BUILDKIT=1 docker build . --target prod -t $MY_APP_IMAGE_NAME:$CURRENT_VERSION"
                        sh "DOCKER_BUILDKIT=1 docker build . --target prod -t $MY_APP_IMAGE_NAME"
                    }
                }

                stage('Push Docker Image') {
                    steps {
                        script {
                             docker.withRegistry("$REGISTRY_URL", 'dcr-docker') {
                               sh "docker push $MY_APP_IMAGE_NAME:$CURRENT_VERSION"
                               sh "docker push $MY_APP_IMAGE_NAME"
                            }
                        }
                    }
                }

                stage('Deploy on Octopus') {
                    agent any
                    steps {
                        println "Octopus Release Version: ${OCTOPUS_VERSION}"
                        script {
                            HELM_CHART_VERSION = getHelmPackageLatestVersion("my-app")

                            println "Octopus Release Version: ${OCTOPUS_VERSION}"
                            println "Octopus deployment  Helm Chart Version: ${HELM_CHART_VERSION}"
                        }

                        sh 'docker run ' +
                                ' --rm octopusdeploy/octo:latest create-release' +
                                " --space=\"${env.OCTOPUS_SPACE}\"" +
                                ' --channel="default"' +
                                " --project=\"${env.OCTOPUS_PROJECT}\"" +
                                " --deployTo=\"${env.OCTOPUS_DEPLOY_TARGET}\"" +
                                " --version=\"${OCTOPUS_VERSION}\"" +
                                " --package=\"my-app:${HELM_CHART_VERSION}\"" +
                                " --server=\"${env.OCTOPUS_SERVER}\"" +
                                " --apiKey=\"${OCTOPUS_API_KEY}\"" +
                                ' --ignoreexisting' +
                                ' --progress' +
                                ' --timeout 30'
                    }
                }
            }
        }

        stage('Cleanup docker') {
            steps {
                sh 'docker image prune -a -f'
            }
        }
    }

    post {
        always {
            script {
                currentBuild.result = currentBuild.result ?: 'SUCCESS'
                notifyBitbucket()
            }
        }
    }
}

