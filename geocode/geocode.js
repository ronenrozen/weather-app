const request = require('request');

const geocodeAddress = (address, apikey, callback) => {
  let addr = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${addr}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to Server");
    } else if (body.info.statuscode !== 0) {
      callback(`Error, please refer to admin with this status code-${body.info.statuscode}`);
    } else {
      callback(undefined, {
        Address: body.results[0].providedLocation.location,
        Latitude: body.results[0].locations[0].latLng.lat,
        Longitude: body.results[0].locations[0].latLng.lng,
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
