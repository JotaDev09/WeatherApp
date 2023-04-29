let location = document.getElementById("positionPhone");

window.addEventListener("load", () => {
  const API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=52.45&longitude=13.38&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,windspeed_10m&daily=precipitation_hours&timezone=auto";

  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const timezone = data.timezone.split("/")[1];
      location.textContent = timezone;
    });
});
/*
const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.45&longitude=13.38&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,windspeed_10m&daily=precipitation_hours&timezone=auto";
const xhr = new XMLHttpRequest();

function onRequestHandler() {
  if ((this.readyState === 4) & (this.status === 200)) {
    const data = JSON.parse(this.response);
    console.log(data);

    const HTMLResponse = document.querySelector("positionPhone");
    const city = data.map((location) => "<a>${location.timezone}</a>");
    HTMLResponse.innerHTML = city;
  }
}

xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", `${API_URL}`);
xhr.send();
*/
