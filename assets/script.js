let today = document.querySelector(".today");
let fiveDay = document.querySelector(".fiveDay");

function getForecast(lat, lon, weatherQuery)
{
    let weatherUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=6d3d04001d76e5ac03fafd3c5691957f";
    
    fetch(weatherUrl).then(function (response)
    {
        return response.json();
    })
    .then(data =>
    {
        console.log(data);

        today.innerHTML = '';

        let iconURL = `https://openweathermap.org/img/wn/10d@2x.png`

        // Create Element
        var h2el = document.createElement("h2");
        var tempel = document.createElement("p");
        var humidel = document.createElement("p");
        var windel= document.createElement("p");
        var imgel = document.createElement("img");
        var dt = data.daily[0].dt;
        var date = new Date(dt * 1000).toLocaleString().split(",")[0];
        console.log(date);
        // // Give element content
        h2el.textContent = weatherQuery;
        tempel.textContent = `Temp: ${data.daily[0].temp.day}F`
        humidel.textContent = `Humidity: ${data.daily[0].humidity}`
        windel.textContent = data.daily[0].wind_speed;

        // Give element attributes (optional)
        h2el.classList.add("cityName");
        imgel.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`);

        // Append element to page
        today.append(h2el, imgel, tempel, humidel, windel);

        for (let i = 1; i < 6; i++) {
           
            
        }

    })
}


function weatherSearch(weatherQuery)
{
   
    let geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + weatherQuery + "&limit=5&appid=6d3d04001d76e5ac03fafd3c5691957f"

    fetch(geocodingUrl).then(function (response)
    {
        return response.json();
    })
    .then(data =>
    {
        let lat = data[0].lat;
        let lon = data[0].lon;
        getForecast(lat, lon, weatherQuery);
        console.log(data);
    })
}

function startSearch()
{
    let weatherQuery = document.querySelector("#weatherQuery");
    weatherQuery = weatherQuery.value;
    console.log(weatherQuery);
    weatherSearch(weatherQuery)
}
inputButton.addEventListener("click", startSearch);