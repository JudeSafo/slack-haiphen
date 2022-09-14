import { App } from 'aws-cdk-lib';
import { LambdaStack } from './LambdaStack';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new LambdaStack(app, 'lambda-stack-dev', { env: devEnv });

app.synth();