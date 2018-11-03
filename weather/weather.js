const request = require('request');

const weatherTemp = (lat, lng, apiKey, callback) => {

  request({
    url: `https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?units=auto`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined,
        {
          summary: body.currently.summary,
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
    } else {
      callback('Unabele to fetch wehtaer');
    }
  });

};


module.exports.weatherTemp = weatherTemp;

