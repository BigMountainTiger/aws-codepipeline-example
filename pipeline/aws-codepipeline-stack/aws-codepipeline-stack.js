// https://developer.aliyun.com/mirror/npm/package/@aws-cdk/aws-codepipeline-actions/v/0.36.1

const cdk = require('@aws-cdk/core');
const deploy_test_bucket = require('./deployments/deploy-test-bucket-stack');
const deploy_test_lambda = require('./deployments/deploy-test-lambda-stack');

class AwsCodepipelinetStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    //deploy_test_bucket(this, id);
    deploy_test_lambda(this, id);
  }
}

module.exports = { AwsCodepipelinetStack }
