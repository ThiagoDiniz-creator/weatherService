const path = require("path"),
  express = require("express"),
  hbs = require("hbs"),
  { geocode } = require("../utils/geocode"),
  { forecast } = require("../utils/forecast");

const public = path.join(__dirname, "../public"),
  viewsPath = path.join(__dirname, "../templates/views"),
  partialsPath = path.join(__dirname, "../templates/partials");

const app = express(); //a função express() cria uma nova aplicação express, que nesse caso está sendo atribuida a
//constante app

//definição da View Engine e da pasta que contém as views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//definição da pasta public, que contém recursos e páginas estáticas
app.use(express.static(public));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Thiago Diniz",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Thiago Diniz",
    helpText: "Useful help message",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Thiago D.",
    image: "./img/robot.png",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address || req.query.address.length === 0) {
    res.send({
      error: {
        status: 0,
        message: "Provide a valid address",
      },
    });
  } else {
    geocode(req.query.address, (error, responseGeocode) => {
      if (error) {
        return res.send({ error });
      }

      const { latitude, longitude } = responseGeocode;

      forecast(latitude, longitude, (error, responseForecast) => {
        if (error) {
          return res.send({ error });
        }

        const { temperature, precip, humidity, location } = responseForecast;
        res.send({
          forecast: `${temperature}°C with a ${precip}% of raining and a ${humidity}% of humidity`,
          location,
          address: req.query.address,
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "Error 404",
    name: "Thiago D.",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "Error 404",
    name: "Thiago D.",
    error: "Page not found",
  });
});

app.listen(3001, "", () => console.log("Server is up"));
//a função listen() recebe como primeiro parâmetro a porta onde o servidor vai estar disponível
