#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { AwsCodepipelineArtifactBucketStack } = require('./pipeline/aws-codepipeline-artifact-bucket-stack/aws-codepipeline-artifact-bucket-stack');
const { AwsCodepipelinetStack } = require('./pipeline/aws-codepipeline-stack/aws-codepipeline-stack');

const app = new cdk.App();


const AWS_CODEPIPELINE_BUCKET_STACK_NAME = 'AWS-CODEPIPELINE-ARTIFACT-BUCKET-STACK';
new AwsCodepipelineArtifactBucketStack(app, AWS_CODEPIPELINE_BUCKET_STACK_NAME, {
  description: AWS_CODEPIPELINE_BUCKET_STACK_NAME
});

const AWS_CODEPIPELINE_STACK_NAME = 'AWS-CODEPIPELINE-STACK';
new AwsCodepipelinetStack(app, AWS_CODEPIPELINE_STACK_NAME, {
  description: AWS_CODEPIPELINE_STACK_NAME
});
