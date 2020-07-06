const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const project_constants = require('../../constants/project-constants');

class AwsCodepipelineArtifactBucketStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket_name = project_constants.DEPLOYMENT_BUCKET_NAME;
    new s3.Bucket(this, bucket_name, {
      bucketName: bucket_name,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      lifecycleRules: [ {expiration: cdk.Duration.days(1)} ]
    });
  }
}

module.exports = { AwsCodepipelineArtifactBucketStack }
