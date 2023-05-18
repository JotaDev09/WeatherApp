//array with the months of the year
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//array with the week's days
const daysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/*
 * the function init the necesary functions to load the main site.
 */
function initHome() {
  getTime();
  getCompleteDate();
  includeHTML();
  loadCities();
}

/*
 * the function shows the actual time in the location of the user
 */
function getTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let exactHour = hours < 10 ? "0" + hours : hours.toString();
  let exacfMinute = minutes < 10 ? "0" + minutes : minutes.toString();
  let timeString = exactHour + ":" + exacfMinute;
  let timeContain = document.getElementById("headerTime");
  timeContain.textContent = timeString;
}

/*
 * the function refresh the main page
 */
function refreshMainPage() {
  window.location.reload();
}

/*
 * the function backs to the main page
 */
function backToMainPage() {
  window.location.href = "index.html";
}

/*
 * the function backs to the main page
 */
function openHome() {
  window.location.href = "index.html";
}

/*
 * the function goes to other cities
 */
function openOtherCities() {
  window.location.href = "otherCities.html";
}

/*
 * the function goes to the weather of the location
 */
function openZoneWeather() {
  window.location.href = "zoneWeather.html";
}

/*
 * the function goes to others settings
 */
function openOthers() {
  window.location.href = "others.html";
}

/*
 * the function shows the complete date in the location of the user
 */
function getCompleteDate() {
  var date = new Date();

  dayString = daysNames[date.getDay()] + ", " + date.getDate() + " ";
  monthString = monthNames[date.getMonth()] + " " + date.getFullYear() + " | ";
  hourString = date.getHours() + ":";
  let minutes = date.getMinutes();
  minutesString =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : minutes.toString();

  let dateContain = document.getElementById("completeDate");
  dateContain.textContent =
    dayString + monthString + hourString + minutesString;
}

/**
 * the function loads the saved cities on the localStorage
 *
 */
function loadCities() {
  const saveCities = JSON.parse(localStorage.getItem("saveCities")) || [];

  const arrayCities = document.getElementById("arrayCitiesCont");
  arrayCities.innerHTML = "";

  saveCities.forEach((city) => {
    arrayCities.innerHTML += renderCitiesOfArray(
      city.city,
      city.conditionsCity,
      city.temperatureCity,
      city.iconWeather
    );
  });
}

/**
 * the function render the info and the icons of the cities from the localStorage
 *  *
 * @param {city} - take the element in the html document to give the image
 * @param {conditionsCity} - take the element in the html document to give the image
 * @param {temperatureCity} - take the element in the html document to give the image
 * @param {iconWeather} - take the element in the html document to give the image
 */
function renderCitiesOfArray(
  city,
  conditionsCity,
  temperatureCity,
  iconWeather
) {
  return `
  <div class="new_city" onclick="openOtherCities()">
      <img src="/assets/img/cloudy.svg" class="new_city_img">
      <div class="new_city_weather">
        <p class="new_city_name font_Poppins_14px">${city}</p>
        <p class="new_city_descr font_Poppins_12px">${conditionsCity}</p>
      </div>
      <div class="new_city_temp_cont">
        <p class="new_city_temp font_Poppins_12px">${temperatureCity}</p>
        <img src=${iconWeather} class="new_city_ellipse">
      </div>
  </div>
`;
}
