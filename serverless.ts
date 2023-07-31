import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import testhi from '@functions/testhi';
import createNameAge from '@functions/createNameAge';
import getAllNameAge from '@functions/getAllNameAge';

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript-aws',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    vpc: {
      securityGroupIds: ["sg-0e8f8ba5a152057a8"],
      subnetIds: [
        "subnet-033b10d0b719c99bf",
        "subnet-0edcf0ad24fa8a694",
        "subnet-0d80cbdf35320af62",
      ],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_HOST: "database-1.c4m9ckjt8scx.us-east-1.rds.amazonaws.com",
      DB_PORT: "5432",
      DB_NAME: "testdb",
      DB_USERNAME: "postgres",
      DB_PASSWORD: "ROOTgrape8008!",
    },
  },
  resources: {
    Resources: {
      LambdaExecutionRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: ["lambda.amazonaws.com"],
                },
                Action: ["sts:AssumeRole"],
              },
            ],
          },
          ManagedPolicyArns: [
            "arn:aws:iam::aws:policy/AmazonRDSFullAccess",
            "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
            "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole",
            "arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess",
          ],
          Policies: [
            {
              PolicyName: "LambdaCustomPolicy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: ["s3:GetObject"],
                    Resource: "arn:aws:s3:::*/*",
                  },
                  {
                    Effect: "Allow",
                    Action: ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
                    Resource: "arn:aws:s3:::*/*",
                  },
                  {
                    Effect: "Allow",
                    Action: ["rds-data:ExecuteStatement"],
                    Resource: "*",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  // import the function via paths
  functions: { hello, testhi, createNameAge, getAllNameAge },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
