const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${addr}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject("Unable to connect to Server");
            } else if (body.info.statuscode !== 0) {
                reject(`Error, please refer to admin with this status code-${body.info.statuscode}`);
            } else {
                resolve({
                    Address: body.results[0].providedLocation.location,
                    Latitude: body.results[0].locations[0].latLng.lat,
                    Longitude: body.results[0].locations[0].latLng.lng,
                });
            }
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});