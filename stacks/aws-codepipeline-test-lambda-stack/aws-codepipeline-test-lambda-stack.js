const cdk = require('@aws-cdk/core');
const lambda = require('@aws-cdk/aws-lambda');

class AwsCodepipelineTestLambdaStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const FUCNTION1_NAME = `${id}-FUCNTION-1`
    new lambda.Function(this, FUCNTION1_NAME, {
      functionName: FUCNTION1_NAME,
      code: lambda.Code.fromAsset('./lambdas/function1'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X
    });

  }
}

module.exports = { AwsCodepipelineTestLambdaStack }