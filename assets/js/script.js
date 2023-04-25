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
function init() {
  getTime();
  getPosition();
  getCompleteDate();
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
 * the function shows location of the user
 */
function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCity);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

/*
 * the function looks for the location of the user
 */
function getCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let cityPosition = document.getElementById("positionPhone");
  let apiKey = "cfa328789ed14dfd8d01ec43d7ab6d61"; // replace with your API key
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      let city = data.results[0].components.city;
      cityPosition.textContent = `${city}`;
    })
    .catch((error) => {
      alert(error);
    });
}

/*
 * the function refresh the main page
 */
function refreshMainPage() {
  window.location.reload();
}

/*
 * the function shows the complete date in the location of the user
 */
function getCompleteDate() {
  var date = new Date();

  dayString = daysNames[date.getDay()] + ", " + date.getDate() + " ";
  monthString = monthNames[date.getMonth()] + " " + date.getFullYear() + " | ";
  hourString = date.getHours() + ":" + date.getMinutes();

  let dateContain = document.getElementById("completeDate");
  dateContain.textContent = dayString + monthString + hourString;
}
