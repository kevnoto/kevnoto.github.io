(function() {

    // Elements
    var weather = document.querySelector('.weather.local');
    var temperature = document.querySelector('.weather__temperature.local');
    var unit = document.querySelector('.weather__unit.local');
    var condition = document.querySelector('.weather__condition.local');
    var conditionText = document.querySelector('.weather__condition-text.local');
    var location = document.querySelector('.weather__location.local');

	
	// Weather API
    var PATH_WEATHER_BASE = 'https://query.yahooapis.com/v1/public/yql';
    var PATH_USER_LOCATION = '94587';
    var PATH_USER_UNIT = 'f';
    var PATH_SQL_QUERY = 'q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + PATH_USER_LOCATION + '") and u="' + PATH_USER_UNIT + '"';
    var PATH_ARRAY_FORMAT = 'format=json&diagnostics=false&env=store://datatables.org/alltableswithkeys&callback=';

    var url = encodeURI(PATH_WEATHER_BASE + '?' + PATH_SQL_QUERY + '&' + PATH_ARRAY_FORMAT);
    var url = 'https://api.wunderground.com/api/c2437febb59edd66/forecast10day/conditions/q/37.770421,-122.409390.json'
    // Query the API
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                weather.classList.add('active');
                updateWeather(JSON.parse(request.responseText));
            } else {
                alert('Error getting weather information.');
            }
        }
    }

    request.open('GET', url);
    request.send();

    function updateWeather(raw_data) {
        console.log(raw_data);
        data = raw_data.forecast.simpleforecast.forecastday;

        for (i=0; i<10; i++) {
            forecasts_high[i].innerHTML = data[i].high.fahrenheit;
            forecasts_low[i].innerHTML = data[i].low.fahrenheit;
            forecasts_cond[i].innerHTML = data[i].conditions;
            dates[i].innerHTML = data[i].date.monthname_short + ' ' + data[i].date.day.toString();
        }

        temperature.innerHTML = raw_data.current_observation.temp_f.toString() + '&deg;';
        unit.innerHTML = "F";
        // condition.classList.add('icon-' + raw_data.current_observation.icon);
        conditionText.innerHTML = raw_data.current_observation.weather;
        location.innerHTML = raw_data.current_observation.observation_location.full;
    }

    function updateWeatherYahoo(data) {
        console.log(data);
        data = data.query.results.channel;

        for (i=1; i<11; i++) {
            forecasts_high[i].innerHTML = data.item.forecast[i-1].high;
            forecasts_low[i].innerHTML = data.item.forecast[i-1].low;
            forecasts_cond[i].innerHTML = data.item.forecast[i-1].text;
            dates[i].innerHTML = data.item.forecast[i-1].date.substring(0,7);
        }

        temperature.innerHTML = data.item.condition.temp + '&deg;';
        unit.innerHTML = data.units.temperature;
        condition.classList.add('icon-' + data.item.condition.code);
        conditionText.innerHTML = data.item.condition.text;
        location.innerHTML = data.location.city + ', ' + data.location.country;

    }
})();
