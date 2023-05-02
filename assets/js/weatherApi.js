let currentLocation = document.getElementById("positionPhone");
let currentConditions = document.getElementById("todaysConditions");
let currentIcon = document.getElementById("todaysIcon");
let currentTemperature = document.getElementById("todaysTemperature");
let currentWind = document.getElementById("todaysWind");
let currentPrecipitation = document.getElementById("todaysPrecipitation");
let currentHumidity = document.getElementById("todaysHumidity");

const dailySection = document.getElementById("dailyContainer");
let nextDay = document.getElementById("nextDay");
let nextDayTemp = document.getElementById("nextDayTemp");

window.addEventListener("load", () => {
  const API_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/berlin?unitGroup=metric&key=SCV2Z3QJQ8V7GHSWSY7MESVNR&contentType=json";
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      currentLocation.textContent = data.timezone.split("/")[1];
      console.log(data);
      return {
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
      };
    });
});

function parseCurrentWeather(data) {
  const { conditions, temp, windspeed, precipprob, humidity } =
    data.currentConditions;
  currentConditions.textContent = conditions;
  currentTemperature.textContent = Math.trunc(temp);
  currentWind.textContent = Math.trunc(windspeed) + "km/h";
  currentPrecipitation.textContent = Math.trunc(precipprob) + "%";
  currentHumidity.textContent = Math.trunc(humidity) + "%";
  renderIcons(data.currentConditions.icon);
}

function renderIcons(icon) {
  if (icon === "clear-day") {
    img.src = sunny;
  } else if (icon === "party-cloudy-day" || "fog" || "wind") {
    img.src = partlyCloudy;
  } else if (icon === "cloudy") {
    img.src = cloudy;
  } else if (icon === "snow") {
    img.src = snowy;
  } else if (icon === "rain") {
    img.src = rainy;
  } else if (icon === "partly-cloudy-night") {
    img.src = cloudyNight;
  } else if (icon === "clear-night") {
    img.src = clearNight;
  }
}

function parseDailyWeather(data) {
  dailySection.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const { datetime, temp } = data.days[i];

    // Split the datetime string into an array and reverse it to get year, month, day order
    const dateArray = datetime.split("-").reverse();
    const [day, month] = dateArray;
    const formattedDate = `${day}/${month}`;

    let nextDayImg = renderIconsNextDays(data.days[i].icon);
    dailySection.innerHTML += renderNextDays(formattedDate, temp, nextDayImg);
  }
}

function renderNextDays(formattedDate, temp, nextDayImg) {
  return `
  <div class="hour_weather flex_column_center">
    <a class="days_hour font_Poppins_12px" id="nextDay">${formattedDate}</a>
    <img src="${nextDayImg}" class="days_weather" id="daysWeather">
    <div class="days_temp_cont">
      <a class="days_temp font_Poppins_12px" id="nextDayTemp">${Math.trunc(
        temp
      )}</a>
      <img src="/assets/icons/Ellipse.svg" class="hours_ellipse">
    </div>
  </div>
  `;
}

const sunny = "assets/img/sunny.svg";
const partlyCloudy = "assets/img/partlyCloudy.svg";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

let img = document.getElementById("todaysIcon");

function renderIconsNextDays(icon) {
  for (let i = 0; i < 7; i++) {
    if (icon === "clear-day") {
      return sunny;
    } else if (icon === "party-cloudy-day" || "fog" || "wind" || "cloudy") {
      return partlyCloudy;
    } else if (icon === "snow") {
      return snowy;
    } else if (icon === "rain") {
      return rainy;
    } else if (icon === "partly-cloudy-night") {
      return cloudyNight;
    } else if (icon === "clear-night") {
      return clearNight;
    }
  }
}
