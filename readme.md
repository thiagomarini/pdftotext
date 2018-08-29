# PDF to Text Lambda Function

AWS Nodejs Lambda function to read text from PDFs. It's configured to work behind API Gateway.

[![CircleCI](https://circleci.com/gh/thiagomarini/pdftotext.svg?style=svg)](https://circleci.com/gh/thiagomarini/pdftotext)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## How it works

The Lambda function receives a POST request with the URL of the PDF, downloads it to `/tmp` and then executes the `pdftotext` binary file in the root to extract the PDF's text.

For local development, tests and pipelines you need to install poppler, run `brew install poppler` if using mac.

## How to use

You will need to install [AWS console]( https://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html), [Serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/) and [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) on your machine

Run `serverless config` to initialise the project.

Run `yarn` to install dependencies.

Use `serverless.yaml` to define your routes, handlers, environment variables and domains

To invoke locally use `serverless invoke local -f pdfToText --log --path __tests__/components/sample-event.json`

## Deploy

`serverless deploy --stage <stage>`

## Testing

It's configured to use [jest](https://jestjs.io/).

A sample API Gateway event is in the `__tests__` folder.

Run `yarn test` to run the test. There's only one functional test in there.

## Pipelines

On Circle CI pipelines you'll need AWS credentials to be able to deploy.
And as mentioned on `How it works` you'll need `poppler` on your docker image, the one on `.circleci/config.yml` already has it.
