//variables of weather images
const sunny = "assets/img/sunny.svg";
const partCloudy = "assets/img/partCloudy.png";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

function initZone() {
  getTime(), subHeader(), includeHTML();
}

/*
 * the function load the forecast of the current location
 */
window.addEventListener("load", () => {
  const API_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/berlin?unitGroup=metric&include=hours%2Ccurrent&key=SCV2Z3QJQ8V7GHSWSY7MESVNR&contentType=json";
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //currentLocation.textContent =
      // data.address.charAt(0).toUpperCase() + data.address.slice(1);
      console.log(data);
      return {
        //current: parseCurrentWeather(data),
        zone: parseZoneWeather(data),
        hourly: parsehourlyWeather(data),
      };
    });
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

function parsehourlyWeather(data) {
  const actualHour = parseInt(data.currentConditions.datetime.slice(11, 13));
  const hourlySection = document.getElementById("hourlyWeather");
  hourlySection.innerHTML = "";
  for (let i = 1; i < 9; i++) {
    const { datetime, conditions, temp, precipprob } = data.days[0].hours[i];
    const hour = parseInt(datetime.slice(11, 13));
    if (hour > actualHour) {
      const iconHourImg = renderIcons(data.days[0].hours[i].icon);
      hourlySection.innerHTML += renderNextHours(
        datetime.slice(11, 13) + "h",
        iconHourImg,
        conditions,
        temp,
        precipprob + "%"
      );

      const nextHourImg = document.getElementById("hourlyIcon");
      nextHourImg.src = iconHourImg;
      break; // Stop looping after printing data for the next hour
    }
  }
}

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
