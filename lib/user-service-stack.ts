import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";

interface UserServiceStackProps extends cdk.StackProps {
  stage: string;
}

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: UserServiceStackProps) {
    super(scope, id, props);

    const stage = props?.stage ?? "dev";

    const fn = new NodejsFunction(this, `NameService-${stage}`, {
      functionName: `name-service-${stage}`,
      depsLockFilePath: "package-lock.json",
      entry: "src/lambda.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
      bundling: {
        externalModules: ["aws-sdk"],
        nodeModules: ["hono"],
        commandHooks: {
          beforeBundling: () => [],
          beforeInstall: () => [],
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/.env ${outputDir}`];
          },
        },
      },
      environment: {
        NODE_ENV: stage === "prod" ? "production" : "development",
        STAGE: stage,
      },
    });

    const endpoint = new apigw.LambdaRestApi(this, `NameServiceGateway-${stage}`, {
        description: `Name Service Gateway (Stage: ${stage})`,
        handler: fn,
        proxy: true,
        deployOptions: {
          stageName: stage,
        },
      }
    );

    new cdk.CfnOutput(this, `NameServiceEndpoint-${stage}`, {
      value: endpoint.url,
      description: `The endpoint of Name Service (Stage: ${stage})`,
    });
  }
}
