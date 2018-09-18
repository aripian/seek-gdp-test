import * as math from 'mathjs';
import ad from '../config/ad';
import company from '../config/company';
import discounts from '../config/discounts';

const calculateDiscounts = (data, cb) => {
  const customer = data.cust_name.toLowerCase();
  const ad_id = data.ad_id.split(','); // eslint-disable-line
  let totalPrice = 0;
  let totalClassic = 0;
  let totalStandout = 0;
  let totalPremium = 0;

  const getBreakData = () => {
    ad_id.forEach((id) => { // eslint-disable-line
      if (id.toLowerCase() === 'classic') {
        totalClassic += 1;
      }
      if (id.toLowerCase() === 'standout') {
        totalStandout += 1;
      }
      if (id.toLowerCase() === 'premium') {
        totalPremium += 1;
      }
    });
  };

  const calculateAdd = () => {
    getBreakData();
    if (customer === 'default') {
      totalPrice = (totalClassic * ad.classic) + (totalStandout * ad.standout) + (totalPremium * ad.premium);
    } else {
      const discountList = company[customer.toLowerCase()].discounts;
      if (discountList.length > 0) {
        discountList.forEach((disc) => {
          if (discounts[disc].ad === 'classic') {
            if (discounts[disc].type === 'cal' && discounts[disc].rule.replace('-1', totalClassic)) {
              totalClassic = math.eval(discounts[disc].calculation.replace('-1', totalClassic));
            } else if (discounts[disc].type === 'comp' && discounts[disc].rule === 'classic') {
              totalClassic = math.eval(discounts[disc].calculation.replace('-1', totalClassic));
            } else {
              totalClassic *= ad.classic;
            }
          }
          if (discounts[disc].ad === 'standout') {
            if (discounts[disc].type === 'cal' && discounts[disc].rule.replace('-1', totalStandout)) {
              totalStandout = math.eval(discounts[disc].calculation.replace('-1', totalStandout));
            } else if (discounts[disc].type === 'comp' && discounts[disc].rule === 'standout') {
              totalStandout = math.eval(discounts[disc].calculation.replace('-1', totalStandout));
            } else {
              totalStandout *= ad.standout;
            }
          }
          if (discounts[disc].ad === 'premium') {
            if (discounts[disc].type === 'cal' && discounts[disc].rule.replace('-1', totalPremium)) {
              totalPremium = math.eval(discounts[disc].calculation.replace('-1', totalPremium));
            } else if (discounts[disc].type === 'comp' && discounts[disc].rule === 'premium') {
              totalPremium = math.eval(discounts[disc].calculation.replace('-1', totalPremium));
            } else {
              totalPremium *= ad.premium;
            }
          }
        });
      } else {
        totalClassic *= ad.classic;
        totalStandout *= ad.standout;
        totalPremium *= ad.premium;
      }
      console.log(totalClassic);
      console.log(totalStandout);
      console.log(totalPremium);
      totalPrice = totalClassic + totalStandout + totalPremium;
    }

    cb({
      total: totalPrice,
    });
  };

  calculateAdd();
};

module.exports = {
  calculateDiscounts,
};
