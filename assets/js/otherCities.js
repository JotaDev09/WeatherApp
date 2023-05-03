//variables of weather images
const sunny = "assets/img/sunny.svg";
const partlyCloudy = "assets/img/partCloudy.png";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

/*
 * the function init the necesary functions to load the otherCities site.
 */
function otherCitiesInit() {
  includeHTML();
  UpperCase();
}

/*
 * the function creates the first upper case letter in the search box.
 */
function UpperCase() {
  const input = document.getElementById("inputSearchCity");

  input.addEventListener("input", () => {
    const value = input.value;
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
  });
}

/*
 * the function searchs the wish city of the user
 */
function searchCity() {
  const newCity = document.getElementById("inputSearchCity").value;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${newCity}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=SCV2Z3QJQ8V7GHSWSY7MESVNR&options=beta&contentType=json`;

  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return {
        searchedCity: parseCurrentsearchedCity(data),
      };
    })
    .catch((err) => {
      console.error(err);
    });

  newCity.value = "";
}

/**
 * the function render the icons of the wished city of the user
 *  *
 * @param {iconWeather} - take the element in the html document to give the image
 */
function renderIcons(iconWeather) {
  if (iconWeather === "clear-day") {
    return sunny;
  } else if (iconWeather === "party-cloudy-day" || iconWeather === "wind") {
    return partlyCloudy;
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

/**
 * the function render the info of the forecast
 *  *
 * @param {data} - take the info of the user's wished city
 */
function parseCurrentsearchedCity(data) {
  const newCity = document.getElementById("searchedCitiesContainer");
  newCity.innerHTML = "";

  const { icon, temp } = data.currentConditions;
  const city = data.address;
  const conditionsCity = icon;
  const temperatureCity = Math.round(((temp - 32) * 5) / 9);

  const iconWeather = renderIcons(data.currentConditions.icon);
  newCity.innerHTML += renderNewCity(
    city,
    conditionsCity,
    temperatureCity,
    iconWeather
  );

  const searchedCityImg = document.getElementById("searchedCityImg");
  searchedCityImg.src = iconWeather;
}

/**
 * the function render the info and the icons of the weather in the wished city
 *  *
 * @param {city} - take the element in the html document to give the image
 * @param {conditionsCity} - take the element in the html document to give the image
 * @param {temperatureCity} - take the element in the html document to give the image
 * @param {iconWeather} - take the element in the html document to give the image
 */
function renderNewCity(city, conditionsCity, temperatureCity, iconWeather) {
  return `
    <div class="searched_city_cont">
      <div class="searched_city_info_cont">
          <div class="searched_city_info">
              <a class="searched_city_name font_Poppins_14px" id="searchedCityName">${city}</a>
              <a class="searched_city_weather font_Poppins_14px" id="searchedCityWeather">${conditionsCity}</a>
          </div>
          <div class="searched_city_info_cont2">
              <a class="searched_city_temp font_Poppins_14px" id="searchedCityTemp">${temperatureCity}</a>
              <img src="assets/icons/Ellipse.svg" class="searched_city_ellipse">
          </div>
      </div>
      <img class="searched_city_img" id="searchedCityImg" src="${iconWeather}" alt="${conditionsCity} icon">
    </div>
  `;
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
