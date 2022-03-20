// Menu: Get Current Weather
// Description: Forecast provided by weather.gov
// Author: Daniel Chapman
// Twitter: @ds_chapman

import "@johnlindquist/kit"

let input = await arg("Get the Weather", ["For My Current Location", "For a Different Location"])
var location;
if (input == "For My Current Location") {
  // Requires LocateMe installed on the path 
  // '$ brew install locateme'
  // Also make sure to allow locateme in privacy/security
  location = await $`locateme -f "lat={LAT}&lon={LON}"`;
  div(
  `<iframe src="https://forecast.weather.gov/MapClick.php?${location}" height=1280px width=100% />`, 
);
} else if (input == "For a Different Location") {
  location = await arg("City, State or Zip")

  div(`<iframe src="https://forecast.weather.gov/zipcity.php?inputstring=${location}" height=1280px width=100% />`)


}


