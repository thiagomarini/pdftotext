const child_process = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

process.env["PATH"] =
  process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"];

const handler = (event, context) =>
  writeTmp(Buffer.from(event.body, event.isBase64Encoded ? "base64" : "binary"))
    .then(tmpPath =>
      execFile("pdftotext", ["-enc", "UTF-8", "-layout", tmpPath, "-"], {
        encoding: "utf8"
      })
    )
    .then(({ stdout }) => stdout)
    .then(text => ({
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain"
      },
      body: text
    }))
    .catch(error => {
      console.error(error.message);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "text/plain"
        },
        body: ""
      };
    });

const writeTmp = data => {
  const tmpPath = path.join(
    "/tmp",
    `body${crypto.randomBytes(32).toString("hex")}`
  );
  return writeFile(tmpPath, data).then(() => tmpPath);
};

const execFile = (file, args, options) =>
  new Promise((resolve, reject) => {
    child_process.execFile(file, args, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve({ stdout, stderr });
    });
  });

const writeFile = (file, data, options) =>
  new Promise((resolve, reject) => {
    fs.writeFile(file, data, options, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

exports.handler = (event, context, callback) => {
  Promise.resolve()
    .then(() => handler(event, context))
    .then(result => callback(null, result))
    .catch(error => callback(error));
};
