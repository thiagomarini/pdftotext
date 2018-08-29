'use strict';

/**
 * Base response HTTP headers
 */
const responseHeaders = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin' : '*',        // Required for CORS support to work
    'Access-Control-Allow-Credentials' : true   // Required for cookies, authorization headers with HTTPS
}

module.exports.success = (data={}, code=200) => {
    return {
        'statusCode': code,
        'headers': responseHeaders,
        'body': JSON.stringify(data)
    }
};

module.exports.error = (error) => {
    return {
        'statusCode': error.code || 500,
        'headers': responseHeaders,
        'body': JSON.stringify(error)
    }
};

module.exports.badRequest = (error) => {
  return {
    'statusCode': error.code || 400,
    'headers': responseHeaders,
    'body': JSON.stringify(error)
  }
};