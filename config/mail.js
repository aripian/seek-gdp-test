const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    mailUrl: 'https://digital.axa.com.my/tariff/mailer/send-email/',
    sender: 'AXA Malaysia<digital@axa.com.my>',
    // to: 'LEE John <john.lee@axa.com.my>; ARIFFIN Mohd Anuar <anuar.ariffin@axa.com.my>',
    to: 'muhammad.norarif@axa.com.my, john.lee@axa.com.my, anuar.ariffin@axa.com.my',
    subject: 'eSkin Motor Quote Daily Report',
    template: '',
    data: 'As attached.',
  },
  staging: {
    mailUrl: 'https://digital.axa.com.my/tariff/mailer/send-email/',
    sender: 'AXA Malaysia<digital@axa.com.my>',
    // to: 'LEE John <john.lee@axa.com.my>; ARIFFIN Mohd Anuar <anuar.ariffin@axa.com.my>',
    to: 'muhammad.norarif@axa.com.my, john.lee@axa.com.my, anuar.ariffin@axa.com.my',
    subject: 'eSkin Motor Quote Daily Report',
    template: '',
    data: 'As attached.',
  },
  production: {
    mailUrl: 'https://digital.axa.com.my/tariff/mailer/send-email/',
    sender: 'AXA Malaysia<digital@axa.com.my>',
    // to: 'LEE John <john.lee@axa.com.my>; ARIFFIN Mohd Anuar <anuar.ariffin@axa.com.my>',
    to: 'muhammad.norarif@axa.com.my, john.lee@axa.com.my, anuar.ariffin@axa.com.my',
    subject: 'eSkin Motor Quote Daily Report',
    template: '',
    data: 'As attached.',
  }
};

module.exports = config[env];
