const { postRequest } = require('./util');

module.exports = (app) => {
  app.post('/run_code', (req, res) => {
    const payload = JSON.stringify({
      source_code: req.body.code,
      language_id: req.body.language_id,
    });
    const options = {
      hostname: process.env.JUDGE0_URL,
      path: '/submissions/?wait=true',
      port: 0,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
      },
    };

    postRequest(options, payload, (status, result) => {
      if (!result) {
        res.send(status);
      }
      res.send(result);
    });
  });
};
