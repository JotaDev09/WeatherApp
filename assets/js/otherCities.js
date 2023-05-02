let searchedNewCity = document.getElementById("searchedCityName");
let currentConditionsSearchedCity = document.getElementById(
  "searchedCityWeather"
);
let currentTemperatureSearchedCity =
  document.getElementById("searchedCityTemp");

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
      searchedNewCity.textContent = data.timezone.split("/")[1];
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
  //const timezone = data;
  const { icon, temp } = data.currentConditions;
  currentConditionsSearchedCity.textContent = icon;
  currentTemperatureSearchedCity.textContent = temp;
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
