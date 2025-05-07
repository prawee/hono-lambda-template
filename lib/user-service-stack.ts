import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'UserServiceHandler', {
      functionName: 'user-service',
      depsLockFilePath: 'package-lock.json',
      entry: 'src/lambda.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
      bundling: {
          externalModules: ['aws-sdk'],
          nodeModules: ['hono'],
          commandHooks: {
              beforeBundling: () => [],
              beforeInstall: () => [],
              afterBundling(inputDir: string, outputDir: string): string[] {
                  return [
                      `cp ${inputDir}/.env ${outputDir}`,
                  ];
              }
          },
      },
      environment: {
          STAGE: process.env.STAGE || 'dev',
      }
    });

    const endpoint = new apigw.LambdaRestApi(this, 'UserServiceGateway', {
      handler: fn,
      proxy: true,
    });

    new cdk.CfnOutput(this, 'UserServiceApiEndpoint', {
      value: endpoint.url,
      description: 'The API endpoint of User Service',
    });
  }
}
