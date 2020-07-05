#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { AwsCodepipelineExampleStack } = require('./stacks/aws-codepipeline-example-stack');

const app = new cdk.App();
new AwsCodepipelineExampleStack(app, 'AwsCodepipelineExampleStack');
