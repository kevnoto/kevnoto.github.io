(function() {
    // Elements
    var weather = document.querySelector('.weather.zion');
    var temperature = document.querySelector('.weather__temperature.zion');
    var unit = document.querySelector('.weather__unit.zion');
    var condition = document.querySelector('.weather__condition.zion');
    var conditionText = document.querySelector('.weather__condition-text.zion');
    var location = document.querySelector('.weather__location.zion');
    var forecasts_high = document.querySelectorAll('td.zion.high');
    var forecasts_low = document.querySelectorAll('td.zion.low');
    var forecasts_cond = document.querySelectorAll('td.zion.cond');
    var dates = document.querySelectorAll('th.zion');

	
	// Weather API
    var PATH_WEATHER_BASE = 'https://query.yahooapis.com/v1/public/yql';
    var PATH_USER_LOCATION = 'Chiang Mai';
    var PATH_USER_UNIT = 'f';
    var PATH_SQL_QUERY = 'q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + PATH_USER_LOCATION + '") and u="' + PATH_USER_UNIT + '"';
    var PATH_ARRAY_FORMAT = 'format=json&diagnostics=false&env=store://datatables.org/alltableswithkeys&callback=';

    var url = encodeURI(PATH_WEATHER_BASE + '?' + PATH_SQL_QUERY + '&' + PATH_ARRAY_FORMAT);
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

    function updateWeather(data) {
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