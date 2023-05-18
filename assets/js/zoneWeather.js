//variables of weather images
const sunny = "assets/img/sunny.svg";
const partCloudy = "assets/img/partCloudy.png";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

function initZone() {
  getTime(), includeHTML();
}

/*
 * the function searchs the current location of the user
 */
function showLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}`;

  const params = {
    unitGroup: "metric",
    key: "SCV2Z3QJQ8V7GHSWSY7MESVNR",
  };

  const queryParams = new URLSearchParams(params);

  fetch(`${url}?${queryParams}`)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.timezone.split("/")[1];
      fetchWeatherData(cityName);
    })
    .catch((error) => {
      console.log("Error retrieving location information:", error);
    });
}

/*
 * the function load the forecast of the current location
 */
function fetchWeatherData(cityName) {
  const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=SCV2Z3QJQ8V7GHSWSY7MESVNR&contentType=json`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      return {
        zone: parseZoneWeather(data),
        hourly: parseHourlyWeather(data),
      };
    });
}

/*
 * the function gets the current position of the user
 */
window.addEventListener("load", () => {
  const geoLocation = navigator.geolocation;

  if (geoLocation) {
    geoLocation.getCurrentPosition(showLocation);
  } else {
    console.log("Please enable location in your browser");
  }
});

/**
 * the function render the info of the forecast in the current location
 *  *
 * @param {data} - take the info of user's location
 */
function parseZoneWeather(data) {
  const { temp, windspeed, precipprob, humidity } = data.currentConditions;
  document.getElementById("zoneTemperatureMax").textContent = Math.trunc(temp);
  document.getElementById("zoneTemperatureMin").textContent =
    data.days[0].tempmin;
  document.getElementById("zoneWind").textContent =
    Math.trunc(windspeed) + "km/h";
  document.getElementById("zonePrecipitation").textContent =
    Math.trunc(precipprob) + "%";
  document.getElementById("zoneHumidity").textContent =
    Math.trunc(humidity) + "%";
  document.getElementById("zoneIcon").src = renderIcons(
    data.currentConditions.icon
  );
}

/**
 * the function render the icons of the current location of the user
 *  *
 * @param {iconCurrentDay} - take the element in the html document to give the image
 */
function renderIcons(iconCurrentDay) {
  if (iconCurrentDay === "clear-day") {
    return sunny;
  } else if (
    iconCurrentDay === "partly-cloudy-day" ||
    iconCurrentDay === "wind"
  ) {
    return partCloudy;
  } else if (iconCurrentDay === "cloudy" || iconCurrentDay === "fog") {
    return cloudy;
  } else if (iconCurrentDay === "snow") {
    return snowy;
  } else if (iconCurrentDay === "rain") {
    return rainy;
  } else if (
    iconCurrentDay === "clear-night" ||
    iconCurrentDay === "partly-cloudy-night"
  ) {
    return clearNight;
  }
}

/**
 * the function render the hourly info of the forecast in the current location
 *  *
 * @param {data} - take the info of user's location
 */
function parseHourlyWeather(data) {
  const hourlySection = document.getElementById("hourlyWeather");
  hourlySection.innerHTML = "";

  const hoursToShow = 7;
  const totalHours = data.days[0].hours.length;
  const currentHour = new Date().getHours();
  let startIndex = currentHour + 1;
  let endIndex = startIndex + hoursToShow;

  if (endIndex > totalHours) {
    endIndex = endIndex % totalHours;
  }

  for (let i = startIndex; i !== endIndex; i++) {
    if (i >= totalHours) {
      i = 0;
    }

    const { datetime, conditions, temp, precipprob } = data.days[0].hours[i];

    const iconHourImg = renderIcons(data.days[0].hours[i].icon);
    hourlySection.innerHTML += renderNextHours(
      datetime.slice(0, 2) + "h",
      iconHourImg,
      conditions,
      Math.trunc(temp),
      Math.trunc(precipprob) + "%"
    );

    const nextHourImg = document.getElementById("hourlyIcon");
    nextHourImg.src = iconHourImg;
  }
}

/**
 * the function render the info and the icons of the weather for the next 8 hours in the current location
 *  *
 * @param {datetime} - take the element in the html document to give next hours
 * @param {iconHourImg} - take the element in the html document to give the image of the weather
 * @param {conditions} - take the element in the html document to give next conditions
 * @param {temp} - take the element in the html document to give the next temperatures
 * @param {precip} - take the element in the html document to give the next precipitations
 */
function renderNextHours(datetime, iconHourImg, conditions, temp, precip) {
  return `
    <div class="hourly_weather">
      <a class="hourly_hour font_Poppins_12px" id="hourlyHour">${datetime}</a>
      <img src="${iconHourImg}" class="hourly_icon" id="hourlyIcon">
      <a class="hourly_conditions font_Poppins_14px" id="hourlyConditions">${conditions}</a>
      <div class="hourly_temperature">
        <a class="hourly_temp font_Poppins_12px" id="hourlyTempMax">${temp}</a>
        <img src="assets/icons/Ellipse.svg" class="hourly_ellipse">
      </div>
      <div class="hourly_temperature">
        <a class="hourly_temp font_Poppins_12px" id="hourlyPrecip">${precip}</a>
      </div>
  </div>
  `;
}
