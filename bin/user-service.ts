#!/opt/homebrew/opt/node/bin/node
import * as cdk from "aws-cdk-lib";
import { UserServiceStack } from "../lib/user-service-stack";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT ?? "",
  region: process.env.CDK_DEFAULT_REGION ?? "ap-southeast-1",
};

const app = new cdk.App();

const stage = app.node.tryGetContext("stage") || "dev";
const stackName = `NameStack-${stage}`;

new UserServiceStack(app, stackName, {
  env,
  stage,
});
