const cdk = require('@aws-cdk/core');

class AwsCodepipelineTestLambdaStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

  }
}

module.exports = { AwsCodepipelineTestLambdaStack }