// import Request from 'request';
import { logger } from './utils/logger';
import db from './utils/db';
import Q from './queries';
import * as math from 'mathjs'

const calculateDiscounts = (data, cb) => {
  const customer = data.cust_name;
  const ad_id = data.ad_id;
  const totalPrice = [];

  if(customer.toLowerCase() === 'default') {
    db.query(Q.getPriceForDefault, [ad_id.join()], (err, res) => {
      if (err) {
        logger.error(err.stack);
        res.json({ error: 'Error getting price' });
      }
      cb({
        sum_price: res.rows[0].sum_price,
      });
    });
  } else {
    ad_id.forEach(id => {
      db.query(Q.getFormulaForCustomer, [id], (err, res) => {
        if (err) {
          logger.error(err.stack);
          res.json({ error: 'Error getting price' });
        }
        res.rows.forEach(row => {
          totalPrice.push(math.eval(row.discount_formula))
        });
        cb({
          sum_price: totalPrice.reduce((a, b) => a + b, 0),
        });
      });
    })
  }
};

module.exports = {
  calculateDiscounts,
};
