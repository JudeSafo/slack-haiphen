import { App, AwsLambdaReceiver, LogLevel } from '@slack/bolt';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { throwExpression } from '../utility';

const signingSecret = process.env.SLACK_SIGNING_SECRET ?? throwExpression('Please provide SLACK_SIGNING_SECRET');
const token = process.env.SLACK_TOKEN ?? throwExpression('No SLACK_TOKEN. Please provide one');

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret,
  logLevel: LogLevel.INFO,
});


const app = new App({
  token,
  receiver: awsLambdaReceiver,
});

app.command('/hyphen', async ({ ack, respond }) => {
  await ack();

  await respond(JSON.stringify({
    data: [{
      aamath:
    0.43809595704078674,
    },
    {
      urdfdom_headers:
    0.4018125534057617,
    },
    {
      jpegoptim:
    0.38550955057144165,
    },
    {
      'dhall-json':
    0.38463133573532104,
    },
    {
      icecast:
    0.38347381353378296,
    },
    {
      diskonaut:
    0.37484338879585266,
    },
    {
      telnet:
    0.3648534119129181,
    },
    {
      dmd:
    0.35837242007255554,
    },
    {
      libvorbis:
    0.35669007897377014,
    }],
  }));
});

export const handler = async (event: APIGatewayProxyEvent, context: any, callback: any) => {
  try {
    console.log('Call Hyphen Command');

    const receiver = await awsLambdaReceiver.start();
    return await receiver(event, context, callback);

  } catch (error) {
    console.error(error);
    const e = error as Error;
    throw e;
  }
};
