pipeline {
   agent { dockerfile true }
   
   environment {
      CI = 'true'
   }

   stages {
   
        stage('Install Packages and Create Build Artifacts') {
            steps {
               sh 'npm install --save material-ui-icons'
               sh 'npm run build'
               }
         }


         stage('Validate the CloudFormation Template') {
            steps {
                  withAWS(region:'ap-southeast-2', credentials:'aws-credentials') {
                  sh 'aws cloudformation validate-template --template-body file://s3.yml'
                  }
               }
         }
         
         stage('Configure S3 Bucket') {
            steps {
                  withAWS(region:'ap-southeast-2', credentials:'aws-credentials') {
                  sh 'aws cloudformation deploy \
                     --template-file s3.yml \
                     --stack-name quantum-stack \
                     --parameter-overrides BucketName=00quantum.link'
                  }
               }
         }
         
         stage('Deploy to Production') {
            steps {
                  withAWS(region:'ap-southeast-2', credentials:'aws-credentials') {
                  s3Delete(bucket: '00quantum.link', path:'**/*')
                  s3Upload(bucket: '00quantum.link', workingDir:'build', includePathPattern:'**/*')
                  }
               
               }
         }
              
      }
}

