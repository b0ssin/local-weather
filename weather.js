document.addEventListener("DOMContentLoaded", function() {

    function setGradient(description) {
        let descriptionsToGradients {
            rain: ""
        }
    }


    // success and error f(x) for getCurrentPosition

    let updateWeather = function(data) {
        let description = data.weather[0].description;
        let location = data.name;
        let iconCode = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        let temp = data.main.temp; //Kelvin
        let descriptionElement = document.getElementById("description");
        let iconElement = document.getElementById("icon");
        let locationElement = document.getElementById("city");
        let tempElement = document.getElementById("tempature");
        descriptionElement.innerHTML = description;
        iconElement.src = iconCode;
        tempElement.innerHTML += (1.8 * (temp - 273.15) + 32).toFixed(0);
        locationElement.innerHTML = location;
    };

    let apiCall = function(lat, lon) {
        // API CALL
        let APIKEY = "ba625e518d32944edba25670fa754131";
        let url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&apikey=" + APIKEY;
        

        let request = new XMLHttpRequest();

        request.open("GET", url, true);

        request.onload = function() {
            if(request.status >= 200 && request.status < 400) {
                //Success
                let data = JSON.parse(request.responseText);
                console.log(data);
                updateWeather(data);

            } else {
                console.log("Reached server then got a connection error");
            }
        };

        request.onerror = function() {
            console.log("Connection error");
        }

        request.send();
    };

    let setLocation = function(lat, lon) {
        let latitude = lat;
        let longitude = lon;
        apiCall(latitude, longitude);
        
    };

    let navError = function(err) {
        console.log(err.code, err.message);
    };

    navigator.geolocation.getCurrentPosition(function(position, navError) {
        setLocation(position.coords.latitude, position.coords.longitude);
    });
    
    
    
    
    
})

