const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const lambda = require('@aws-cdk/aws-lambda');

const project_constants = require('../../constants/project-constants');

class AwsCodepipelineTestLambdaStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const key = 'function1.zip';
    const bucket =  s3.Bucket.fromBucketName(this, `${id}-ARTIFACT-BUCKET`, project_constants.DEPLOYMENT_BUCKET_NAME);
    const FUCNTION1_NAME = `${id}-FUCNTION-1`;

    new lambda.Function(this, FUCNTION1_NAME, {
      functionName: FUCNTION1_NAME,
      code: lambda.Code.fromBucket(bucket, key),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X
    });

  }
}

module.exports = { AwsCodepipelineTestLambdaStack }