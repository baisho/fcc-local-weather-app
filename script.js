$(document).ready(function () {
    //Getting coordinates.

    $.getJSON("https://ipinfo.io/json", function (jsonCoord) {
        var coord = jsonCoord.loc.split(",");
        var lati = coord[0];
        var longi = coord[1];

        //Now we have the coordinates. So we use them to get the data from the weather API.

        $.getJSON(
            "https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?lat=" +
            lati +
            "&lon=" +
            longi +
            "&APPID=608f2325a0ac32149fd498a3ebf24641" +
            "&units=metric&preventCache=" +
            new Date(),
            function (json) {
                //Putting the city name and country code in the #locat place.
                $("#locat").html(json.name + ", " + json.sys.country);

                //Temperature variations with rounding and symbols.
                var celsius = Math.round(json.main.temp * 10) / 10;
                var cPlusSymbol = celsius + ' <span class="symbol">°C</span>';
                var fahrenheit = Math.round((celsius * 1.8 + 32) * 10) / 10;
                var fPlusSymbol = fahrenheit + ' <span class="symbol">°F</span>';
                $("#temp").html(cPlusSymbol);
                //Function to check if #temp is stated in °C or in °F then change it.
                $("#temp").on("click", function () {
                    var phrase = $("#temp").text();
                    if (phrase.indexOf("°C") == -1) {
                        $("#temp").html(cPlusSymbol);
                    } else {
                        $("#temp").html(fPlusSymbol);
                    }
                });

                //Putting weather condition in #cond.
                $("#cond").html(json.weather[0].description);

                //Here we set the backgrounds for different weather conditions.
                var id = json.weather[0].id;
                var bgurl = "";

                //Here are the lot of if statements with different background urls (bgurl).

                //Thunderstorm
                if (200 <= id && id < 300) {
                    bgurl =
                        "images/thunderstorm.jpg";
                } else if (300 <= id && id < 500) {
                    //Drizzle
                    bgurl =
                        "images/drizzle.jpg";
                } else if (500 <= id && id < 600) {
                    //Rain
                    bgurl =
                        "images/rain.jpg";
                } else if (600 <= id && id < 700) {
                    //Snowing
                    bgurl =
                        "images/background.jpg";
                } else if (700 <= id && id < 800) {
                    //Mist
                    bgurl =
                        "images/mist.jpg";
                } else if (800 <= id && id < 802) {
                    //Clear
                    bgurl =
                        "images/clear.jpg";
                } else if (id == 802) {
                    //Scattered clouds
                    bgurl =
                        "images/scattered-clouds.jpg";
                } else if (803 <= id && id < 805) {
                    //Heavy clouds
                    bgurl =
                        "images/heavy-clouds.jpg";
                } else if (900 <= id && id < 1000) {
                    //Wind
                    bgurl =
                        "images/wind.jpg";
                }

                var bckgrnd = {
                    background: "url(" + bgurl + ") no-repeat 50% 50% fixed",
                    "background-size": "cover",
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    position: "fixed"
                };
                $(".background").css(bckgrnd);
            }
        );
    });
});
