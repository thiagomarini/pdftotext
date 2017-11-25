#!/bin/bash

jq --slurp --raw-input '@base64 | {"isBase64Encoded": true, "body": .}'
