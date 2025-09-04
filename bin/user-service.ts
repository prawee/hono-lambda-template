#!/opt/homebrew/opt/node/bin/node
import * as cdk from "aws-cdk-lib";
import { UserServiceStack } from "../lib/user-service-stack";

const app = new cdk.App();
new UserServiceStack(app, "UserServiceStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT ?? undefined,
    region: process.env.CDK_DEFAULT_REGION ?? "ap-southeast-1",
  },
});
