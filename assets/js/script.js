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
  subHeader();
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

function subHeader() {
  let subHeader = document.getElementById("subHeaderTitle");
  if (document.location.pathname === "OtherCities") {
    console.log("title");
    subHeader.textContent = "Search for City";
  }
}

/**
 * include templates html
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
