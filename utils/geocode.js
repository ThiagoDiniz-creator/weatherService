const request = require("postman-request");

const generateQueryUrl = (address) => {
  const encodedAddress = encodeURIComponent(address);
  const parsedQuery = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoidGhpYWdvZGluaXpiciIsImEiOiJja3FtcXFvN24waW1wMnZ0aXNmeHh5dWYyIn0.OUnolqfJF_7kcoSg6gepZg&types=place`;
  return parsedQuery;
};

const geocode = (address, callback) => {
  if (!address || address.length === 0) {
    return console.log("Please pass a valid location");
  }
  const queryUrl = generateQueryUrl(address);
  request({ url: queryUrl, json: true }, (error, response) => {
    if (error) {
      return callback("Unable to connect to location services!", undefined);
    }

    const { body } = response,
      { features } = body;
    if (body.message !== undefined || features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      const latitude = features[0].center[1],
        longitude = features[0].center[0];
      callback(undefined, {
        latitude,
        longitude,
      });
    }
  });
};

module.exports = {
  geocode,
};
