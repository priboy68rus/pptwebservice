const { getTaxStatus } = require('../utils/scraper');

const innTaxStatus = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { inn, date } = req.body;
    const taxStatus = await getTaxStatus(inn, date);
    
    res.json(taxStatus);
  } catch(error) {
    next(error);
  }
}

module.exports = {
  innTaxStatus
}