import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'slack-hyphen',
  packageManager: javascript.NodePackageManager.PNPM,
  projenrcTs: true,
  gitignore: ['.env'],
  deps: ['@slack/bolt', 'aws-lambda', 'dotenv'], /* Runtime dependencies of this module. */
  devDeps: ['@types/aws-lambda', 'ts-node@^10.9.1', '@types/node'], /* Build dependencies for this module. */
});

project.addTask('profile', { exec: 'cdk deploy --profile jolo' });
project.synth();