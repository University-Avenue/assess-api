const { makeRequest } = require('./util');

module.exports = (app) => {
  app.post('/run_code', (req, res) => {
    if (!process.env.JUDGE0_API_KEY) {
      console.log('Provide API key', process.env.JUDGE0_API_KEY);
      return;
    }

    const payload = JSON.stringify({
      source_code: req.body.code,
      language_id: req.body.language_id,
    });
    const options = {
      hostname: 'judge0.p.rapidapi.com',
      path: '/submissions',
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'x-rapidapi-key': process.env.JUDGE0_API_KEY,
      },
    };

    makeRequest(options, payload, (status, result) => {
      if (!result) {
        res.send(status);
      }

      const getOptions = {
        hostname: 'judge0.p.rapidapi.com',
        path: `/submissions/${JSON.parse(result).token}`,
        port: 443,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': payload.length,
          'x-rapidapi-key': process.env.JUDGE0_API_KEY,
        },
      };

      setTimeout(() => {
        postRequest(getOptions, payload, (getStatus, getResult) => {
          console.log(getStatus, getResult);
        });
      }, 3000);

      res.send(result);
    });
  });
};
