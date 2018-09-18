// import Request from 'request';
import { logger } from './utils/logger';
import ad from '../config/ad';
import company from '../config/company';
import discounts from '../config/discounts';
import * as math from 'mathjs'

const calculateDiscounts = (data, cb) => {
  const customer = data.cust_name;
  const ad_id = data.ad_id.split(',');

  let totalPrice = 0;
  let totalClassic = 0;
  let totalStandout = 0;
  let totalPremium = 0;

  const getBreakData = () => {
    ad_id.forEach((id) => {
      if (id.toLowerCase() === 'classic'){
        totalClassic += 1;
      }
      if (id.toLowerCase() === 'standout'){
        totalStandout += 1;
      }
      if (id.toLowerCase() === 'premium'){
        totalPremium += 1;
      }
    })
  };

  const calculateAdd = () => {
    getBreakData();
    if (customer === 'default'){
      totalPrice = (totalClassic * ad.classic) + (totalStandout * ad.standout) + (totalPremium * ad.premium);
    } else {
      const discountList = company[customer.toLowerCase()];

      if (discountList.length > 0){
        discountList.forEach((disc) =>{
          if(discounts[disc].ad == 'classic') {
            if(discounts[disc].type == 'cal' && discounts[disc].rule.replace('-1',totalClassic)) {
              totalClassic = math.eval(discounts[disc])
            }
          }
        })
      } else {
        totalPrice = (totalClassic * ad.classic) + (totalStandout * ad.standout) + (totalPremium * ad.premium);
      }
    }

    cb({
      total: totalPrice,
    })
  }
};

module.exports = {
  calculateDiscounts,
};
