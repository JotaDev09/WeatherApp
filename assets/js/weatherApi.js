//variables of the html document
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
let img = document.getElementById("todaysIcon");

//variables of weather images
const sunny = "assets/img/sunny.svg";
const partCloudy = "assets/img/partCloudy.png";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

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
      currentLocation.textContent =
        data.address.charAt(0).toUpperCase() + data.address.slice(1);
      return {
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
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
    alert("Please enable location in your browser");
  }
});

/**
 * the function render the info of the forecast in the current location
 *  *
 * @param {data} - take the info of user's location
 */
function parseCurrentWeather(data) {
  const { conditions, temp, windspeed, precipprob, humidity } =
    data.currentConditions;
  currentConditions.textContent = conditions;
  currentTemperature.textContent = Math.trunc(temp);
  currentWind.textContent = Math.trunc(windspeed) + "km/h";
  currentPrecipitation.textContent = Math.trunc(precipprob) + "%";
  currentHumidity.textContent = Math.trunc(humidity) + "%";
  const imgCurrentDay = renderIcons(data.currentConditions.icon);
  const currentDayImg = document.getElementById("todaysIcon");
  currentDayImg.src = imgCurrentDay;
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
  } else if (iconCurrentDay === "partly-cloudy-night") {
    return cloudyNight;
  } else if (iconCurrentDay === "clear-night") {
    return clearNight;
  }
}

/**
 * the function render the day'sinfo of the forecast in the current location
 *  *
 * @param {data} - take the day'sinfo of user's location
 */
function parseDailyWeather(data) {
  dailySection.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const { datetime, tempmax } = data.days[i];

    // Split the datetime string into an array and reverse it to get year, month, day order
    const dateArray = datetime.split("-").reverse();
    const [day, month] = dateArray;
    const formattedDate = `${day}/${month}`;

    const iconDayImg = renderIconsNextDays(data.days[i].icon);
    dailySection.innerHTML += renderNextDays(
      formattedDate,
      tempmax,
      iconDayImg
    );

    const nextDayImg = document.getElementById("daysWeather");
    nextDayImg.src = iconDayImg;
  }
}

/**
 * the function render the icons of the current location of the user for the next 6 days
 *  *
 * @param {iconWeather} - take the element in the html document to give the image
 */
function renderIconsNextDays(iconWeather) {
  for (let i = 0; i < 7; i++) {
    if (iconWeather === "clear-day") {
      return sunny;
    } else if (iconWeather === "partly-cloudy-day" || iconWeather === "wind") {
      return partCloudy;
    } else if (iconWeather === "cloudy" || iconWeather === "fog") {
      return cloudy;
    } else if (iconWeather === "snow") {
      return snowy;
    } else if (iconWeather === "rain") {
      return rainy;
    } else if (iconWeather === "partly-cloudy-night") {
      return cloudyNight;
    } else if (iconWeather === "clear-night") {
      return clearNight;
    }
  }
}

/**
 * the function render the info and the icons of the weather for the next 6 days in the current location
 *  *
 * @param {formattedDate} - take the element in the html document to give the exact date
 * @param {tempmax} - take the element in the html document to give the maxim temperature
 * @param {iconDayImg} - take the element in the html document to give the image
 */
function renderNextDays(formattedDate, tempmax, iconDayImg) {
  return `
  <div class="hour_weather flex_column_center">
    <a class="days_hour font_Poppins_12px" id="nextDay">${formattedDate}</a>
    <img src="${iconDayImg}" class="days_weather" id="daysWeather">
    <div class="days_temp_cont">
      <a class="days_temp font_Poppins_12px" id="nextDayTemp">${Math.trunc(
        tempmax
      )}</a>
      <img src="/assets/icons/Ellipse.svg" class="hours_ellipse">
    </div>
  </div>
  `;
}
