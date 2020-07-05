#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { AwsCodepipelineBucketStack } = require('./stacks/aws-codepipeline-bucket-stack/aws-codepipeline-bucket-stack');

const app = new cdk.App();
const AWS_CODEPIPELINE_BUCKET_STACK_NAME = 'AWS-CODEPIPELINE-BUCKET-STACK';
new AwsCodepipelineBucketStack(app, AWS_CODEPIPELINE_BUCKET_STACK_NAME, {
  description: AWS_CODEPIPELINE_BUCKET_STACK_NAME
});
