#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const addPipelineStacks = require('./pipeline/add-pipeline-stacks');

const { AwsCodepipelineTestBucketStack } = require('./stacks/aws-codepipeline-test-bucket-stack/aws-codepipeline-test-bucket-stack');
const { AwsCodepipelineTestLambdaStack } = require('./stacks/aws-codepipeline-test-lambda-stack/aws-codepipeline-test-lambda-stack');

const app = new cdk.App();

addPipelineStacks.add(app);

const AWS_CODEPIPELINE_TEST_BUCKET_STACK_NAME = 'AWS-CODEPIPELINE-TEST-BUCKET-STACK';
new AwsCodepipelineTestBucketStack(app, AWS_CODEPIPELINE_TEST_BUCKET_STACK_NAME, {
  description: AWS_CODEPIPELINE_TEST_BUCKET_STACK_NAME
});

const AWS_CODEPIPELINE_TEST_LAMBDA_STACK_NAME = 'AWS-CODEPIPELINE-TEST-LAMBDA-STACK';
new AwsCodepipelineTestLambdaStack(app, AWS_CODEPIPELINE_TEST_LAMBDA_STACK_NAME, {
  description: AWS_CODEPIPELINE_TEST_LAMBDA_STACK_NAME
});
