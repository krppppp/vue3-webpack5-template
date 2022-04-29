const data = require('./locales/zh-tw.json');
const fs = require('fs');

const obj = {
  type: 'object',
  properties: Object.keys(data).reduce((carry, item) => {
    carry[item] = {type: 'string'};
    
    return carry;
  }, {}),
  required: Object.keys(data),
  additionalProperties: false,
};

fs.writeFile('src/i18n/schema.json', JSON.stringify(obj), err => {
  if (err) {
    console.error(err);
  }

  console.log('success');
});