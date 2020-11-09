const https = require('https');
const http = require('http');

const postRequest = (options, data, onResult) => {
  // https requests by default use port 443 and http use port 80
  const port = options.port === 443 ? https : http;
  const req = port.request(options, (res) => {
    let output = '';
    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      onResult(res.statusCode, output);
    });
  }).on('error', (err) => {
    console.log('Error: ', err.message);
  });

  req.write(data);
  req.end();
};

exports.postRequest = postRequest;
