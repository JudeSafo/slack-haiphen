import path from 'path';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi, MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { setup, throwExpression } from './utility';

setup();

const SLACK_TOKEN: string = process.env.SLACK_TOKEN ?? throwExpression('Please provide a Slack Token');
const SLACK_SIGNING_SECRET: string = process.env.SLACK_SIGNING_SECRET ?? throwExpression('Please provide a Slack Signing Secret');

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const lambdaFolder: string = path.join(path.dirname(__filename), './lambda');

    const slashHandler = new NodejsFunction(this, 'InteractiveSlackBot', {
      bundling: {
        minify: true,
      },
      entry: `${lambdaFolder}/hyphenHandler.ts`,
      timeout: Duration.minutes(1),
      environment: {
        SLACK_TOKEN,
        SLACK_SIGNING_SECRET,
      },
    });

    const api = new LambdaRestApi(this, 'HyphenRestApi', {
      handler: slashHandler,
      proxy: false,
      deployOptions: {
        stageName: 'dev',
        loggingLevel: MethodLoggingLevel.INFO,
        tracingEnabled: true,
      },
    });

    const endpoint = api.root.addResource('hyphen');
    endpoint.addMethod('POST'); // POST /dev/hyphen

  }
}