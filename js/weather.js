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

    // Query the API
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
            	weather.classList.add('active');
                updateWeather(JSON.parse(request.responseText));
                // console.log(JSON.parse(request.responseText));
            } else {
                console.log('Error getting weather information.');
            }
        }
    }

    request.open('GET', url);
    request.send();

    function updateWeather(data) {
        data = data.query.results.channel;

        temperature.innerHTML = data.item.condition.temp + '&deg;';
        unit.innerHTML = data.units.temperature;
        condition.classList.add('icon-' + data.item.condition.code);
        conditionText.innerHTML = data.item.condition.text;
        location.innerHTML = data.location.city + ', ' + data.location.country;
    }
})();