const request = require("postman-request");

const forecast = (latitude = 0, longitude = 0, callback) => {
  const queryUrl = `http://api.weatherstack.com/current?access_key=7aa1d8c803ee94db75dd7d301d120a17&query=${latitude},${longitude}`;
  request({ url: queryUrl, json: true }, (error, { body = {} }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.success !== undefined) {
      const { type, info } = body.error;
      callback(`${type}:${info}`, undefined);
    } else {
      const { location } = body,
        { temperature, precip, humidity } = body.current;
      callback(undefined, {
        temperature,
        precip,
        humidity,
        location:
          location.name + ", " + location.region + ", " + location.country,
      });
    }
  });
};

module.exports = {
  forecast,
};
