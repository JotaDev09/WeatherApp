let searchedNewCity = document.getElementById("searchedCityName");
let currentConditionsSearchedCity = document.getElementById(
  "searchedCityWeather"
);
let currentTemperatureSearchedCity =
  document.getElementById("searchedCityTemp");

const sunny = "assets/img/sunny.svg";
const partlyCloudy = "assets/img/partlyCloudy.svg";
const cloudy = "assets/img/cloudy.svg";
const snowy = "assets/img/snow.svg";
const rainy = "assets/img/rainy.png";
const cloudyNight = "assets/img/cloudyNight.svg";
const clearNight = "assets/img/night.png";

function otherCitiesInit() {
  includeHTML();
  UpperCase();
}

function UpperCase() {
  const input = document.getElementById("inputSearchCity");

  input.addEventListener("input", () => {
    const value = input.value;
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
  });
}

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

function parseCurrentsearchedCity(data) {
  const newCity = document.getElementById("searchedCitiesContainer");
  newCity.innerHTML = "";

  const { conditions, temp } = data.currentConditions;
  const city = data.address;
  const conditionsCity = conditions;
  const temperatureCity = Math.round(((temp - 32) * 5) / 9);

  const iconWeather = renderIcons(data.currentConditions.icon);
  newCity.innerHTML += renderNewCity(
    city,
    conditionsCity,
    temperatureCity,
    iconWeather
  );
}

function renderNewCity(city, conditionsCity, temperatureCity, iconWeather) {
  const iconImageUrl = renderIcons(iconWeather);
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
      <img class="searched_city_img" id="searchedCityImg" src="${iconImageUrl}" alt="${conditionsCity} icon">
    </div>
  `;
}

function renderIcons(icon) {
  //let img = document.getElementById("searchedCityImg");
  if (icon === "clear-day") {
    //   img.src = sunny;
    return sunny;
  } else if (icon === "party-cloudy-day" || "fog" || "wind") {
    //   img.src = partlyCloudy;
    return partlyCloudy;
  } else if (icon === "cloudy") {
    //   img.src = cloudy;
    return cloudy;
  } else if (icon === "snow") {
    //   img.src = snowy;
    return snowy;
  } else if (icon === "rain") {
    //   img.src = rainy;
    return rainy;
  } else if (icon === "partly-cloudy-night") {
    //   img.src = cloudyNight;
    return cloudyNight;
  } else if (icon === "clear-night") {
    //   img.src = clearNight;
    return clearNight;
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
