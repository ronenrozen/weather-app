
const yargs = require('yargs');
const apikeys = require('./APIKeys/APIkeys.js');
const axios = require('axios');

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

let addr = encodeURIComponent(argv.address);
let geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${apikeys.mapquestapikey}&location=${addr}`;


axios.get(geocodeUrl).then((response) => {
  if (response.data.info.statuscode !== 0) {
    throw new Error(`Error, please refer to admin with this status code-${response.info.statuscode}`);
  }
  console.log(`The address is-"${response.data.results[0].locations[0].street}".`)
  let lat = response.data.results[0].locations[0].latLng.lat;
  let lng = response.data.results[0].locations[0].latLng.lng
  let weatherUrl = `https://api.darksky.net/forecast/${apikeys.darksyAPIKey}/${lat},${lng}?units=auto`
  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`The temperature currently is ${temperature}. It fells like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API server');
  } else {
    console.log('e', e.meesage);
  }
});