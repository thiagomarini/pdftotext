'use strict';

const PdfToText = require("./pdfToTextCaller");
const ReaderComponent = require("./components/reader");

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

module.exports.pdfToText = async (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  await ReaderComponent.read(event, callback, PdfToText);
};
