require('dotenv').config();

const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const codebuild = require('@aws-cdk/aws-codebuild');
const codepipeline = require('@aws-cdk/aws-codepipeline');
const codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
const iam = require('@aws-cdk/aws-iam');

const project_constants = require('../../../constants/project-constants');

const deployment = (scope, id) => {

  const PIPELINE_NAME = `${id}-PIPELINE`;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = 'BigMountainTiger';
  const REPOSITORY_NAME = 'aws-codepipeline-example';

  const sourceOutput = new codepipeline.Artifact();

  const access_key = process.env.ACCESS_KEY;
  const secret_key = process.env.SECRET_KEY;

  const install_commands = [];
  install_commands.push('npm install -g aws-cdk');
  install_commands.push('npm install');
  install_commands.push('mkdir ~/.aws');
  install_commands.push('echo "[DProfile]" >> ~/.aws/credentials');
  install_commands.push(`echo "aws_access_key_id = ${access_key}" >> ~/.aws/credentials`);
  install_commands.push(`echo "aws_secret_access_key = ${secret_key}" >> ~/.aws/credentials`);
  install_commands.push('echo "region=us-east-1" >> ~/.aws/credentials');
  install_commands.push('cat ~/.aws/credentials');
  install_commands.length = 0;

  const build_commands = [];
  build_commands.push('cdk deploy AWS-CODEPIPELINE-TEST-BUCKET-STACK --profile DProfile --require-approval never');
  build_commands.push('cd ~');
  build_commands.push('ls -la');
  build_commands.length = 0;

  build_commands.push('aws --version');
  build_commands.push('aws s3 ls s3://huge-head-li-codepipeline-artifact-bucket');

  const cdkBuild = new codebuild.PipelineProject(scope, 'CdkBuild', {
    buildSpec: codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        install: { commands: install_commands },
        build: { commands: build_commands }
      }
    }),
    environment: { buildImage: codebuild.LinuxBuildImage.STANDARD_3_0 }
  });

  // let policyStatement = new iam.PolicyStatement();
  // policyStatement.addAllResources();
  // policyStatement.addActions(['*']);
  // cdkBuild.addToRolePolicy(policyStatement);

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
        stageName: 'Deploy',
        actions: [
          new codepipeline_actions.CodeBuildAction({
            actionName: 'CDK_Deploy',
            project: cdkBuild,
            input: sourceOutput
          })
        ]
      }
    ]
  });
};

module.exports = deployment;