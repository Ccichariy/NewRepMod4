const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

router.get("/api/csrf/restore", (req, res) => {

  console.log("Request:", req);
  const csrfToken = req.csrfToken();

    console.log("csrfToken: ", csrfToken);
    console.log("request: ", req);

    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  };

router.use('/api', apiRouter);

module.exports = router;
