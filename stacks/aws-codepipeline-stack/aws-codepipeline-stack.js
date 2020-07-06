// https://developer.aliyun.com/mirror/npm/package/@aws-cdk/aws-codepipeline-actions/v/0.36.1

require('dotenv').config();

const cdk = require('@aws-cdk/core');
const codebuild = require('@aws-cdk/aws-codebuild');
const codepipeline = require('@aws-cdk/aws-codepipeline');
const codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');

class AwsCodepipelinetStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const OWNER = 'BigMountainTiger';
    const REPOSITORY_NAME = 'aws-codepipeline-example';

    const sourceOutput = new codepipeline.Artifact();
    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');

    const cdkBuild = new codebuild.PipelineProject(this, 'CdkBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: { commands: ['npm install -g aws-cdk', 'npm install'] },
          build: { commands: ['cdk synth -o dist', 'ls -l'] }
        },
        artifacts: {
          'base-directory': 'dist',
          files: ['*']
        }
      }),
      environment: { buildImage: codebuild.LinuxBuildImage.STANDARD_3_0 }
    });

    const PIPELINE_NAME = `${id}-PIPELINE`;
    new codepipeline.Pipeline(this, PIPELINE_NAME, {
      pipelineName: PIPELINE_NAME,
      stages: [
        {
          stageName: 'Source',
          actions: [
            new codepipeline_actions.GitHubSourceAction({
              actionName: 'Github_Source',
              oauthToken: cdk.SecretValue.plainText(GITHUB_TOKEN),
              owner: OWNER,
              repo: REPOSITORY_NAME,
              trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
              output: sourceOutput
            })
          ]
        },
        {
          stageName: 'Build',
          actions: [
            new codepipeline_actions.CodeBuildAction({
              actionName: 'CDK_Build',
              project: cdkBuild,
              input: sourceOutput,
              outputs: [cdkBuildOutput]
            })
          ]
        } 
      ]
    });
  }
}

module.exports = { AwsCodepipelinetStack }
