const { innTaxStatus } = require('./controllers/inn');

const router = require('express').Router();

router.post('/taxStatus', innTaxStatus);


module.exports = (app) => {
  app.use('/', router);

  app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  }); 
};