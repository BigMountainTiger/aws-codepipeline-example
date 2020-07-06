require('dotenv').config();

const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const codebuild = require('@aws-cdk/aws-codebuild');
const codepipeline = require('@aws-cdk/aws-codepipeline');
const codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');

const project_constants = require('../../../constants/project-constants');

const deployment = (scope, id) => {

  const PIPELINE_NAME = `${id}-PIPELINE`;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const OWNER = 'BigMountainTiger';
    const REPOSITORY_NAME = 'aws-codepipeline-example';

    const sourceOutput = new codepipeline.Artifact();
    const cdkBuildOutput = new codepipeline.Artifact('CdkBuildOutput');
    const templateFile = 'AWS-CODEPIPELINE-TEST-BUCKET-STACK.template.json';

    const cdkBuild = new codebuild.PipelineProject(scope, 'CdkBuild', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: { commands: ['npm install -g aws-cdk', 'npm install'] },
          build: { commands: ['cdk synth -o dist', 'ls -l dist'] }
        },
        artifacts: {
          'base-directory': 'dist',
          files: [templateFile]
        }
      }),
      environment: { buildImage: codebuild.LinuxBuildImage.STANDARD_3_0 }
    });

    new codepipeline.Pipeline(scope, PIPELINE_NAME, {
      artifactBucket: s3.Bucket.fromBucketName(scope, `${id}-ARTIFACT-BUCKET`, project_constants.DEPLOYMENT_BUCKET_NAME),
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
        },
        {
          stageName: 'Deploy',
          actions: [
            new codepipeline_actions.CloudFormationCreateUpdateStackAction({
              actionName: 'Pipeline_Deploy',
              templatePath: cdkBuildOutput.atPath(templateFile),
              stackName: 'AWS-CODEPIPELINE-TEST-BUCKET-STACK',
              capabilities: ['CAPABILITY_IAM'],
              adminPermissions: true
            })
          ]
        }
      ]
    });
};

module.exports = deployment;