const getPriceForDefault = 'SELECT SUM(ad_price) WHERE ad_id IN ($1);';

const getFormulaForCustomer = 'SELECT * FROM customer INNER JOIN disc_customer ON disc_customer.cust_id = customer.id INNER JOIN discounts ON discounts.id = disc_customer INNER JOIN ad ON ad.id = disc_customer.ad_id WHERE customer.id = $1;'

export default {
  insertInfo,
  getFormulaForCustomer,
};
