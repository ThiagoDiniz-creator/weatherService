const weatherForm = document.querySelector("form"),
  search = document.querySelector("input"),
  forecast = document.querySelector("#forecast"),
  error = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  forecast.textContent = "Loading...";
  error.innerHTML.length > 0 ? (error.textContent = "") : error.textContent;

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      console.log(data);

      if (data.error || data.forecast == undefined) {
        forecast.textContent.length > 0 ? (forecast.textContent = "") : null;
        return (error.textContent =
          "An error has occured, please provide a valid address and check your internet connection");
      }

      error.innerHTML.length > 0 ? (error.textContent = "") : error.textContent;
      return (forecast.textContent = data.forecast);
    });
  });
});
