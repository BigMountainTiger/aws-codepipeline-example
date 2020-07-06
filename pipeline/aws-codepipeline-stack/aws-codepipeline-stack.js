// https://developer.aliyun.com/mirror/npm/package/@aws-cdk/aws-codepipeline-actions/v/0.36.1

const cdk = require('@aws-cdk/core');
const deploy_test_bucket = require('./deployments/deploy-test-bucket-stack');

class AwsCodepipelinetStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    deploy_test_bucket(this, id);
  }
}

module.exports = { AwsCodepipelinetStack }
