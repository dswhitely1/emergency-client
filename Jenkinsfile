node {
    checkout svm;

    def customImage = docker.build("emergency-client:${env.BUILD_ID}");

    customImage.push()
    customImage.push('latest')

}