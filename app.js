
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const apikeys = require('./APIKeys/APIkeys.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
geocode.geocodeAddress(argv.address, apikeys.mapquestapikey, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.weatherTemp(results.Latitude, results.Longitude, apikeys.darksyAPIKey, (errorMessage, res) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(res);
      }
    });
  }
});
