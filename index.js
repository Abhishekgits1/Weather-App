const _0x1484e5=_0x2c50;function _0x2c50(_0x4dc0dc,_0x568a8d){const _0x47b866=_0x47b8();return _0x2c50=function(_0x2c508b,_0x5d30f9){_0x2c508b=_0x2c508b-0x1e4;let _0x530c43=_0x47b866[_0x2c508b];return _0x530c43;},_0x2c50(_0x4dc0dc,_0x568a8d);}(function(_0x78af41,_0x2e1a4d){const _0x292b96=_0x2c50,_0x5ee9ce=_0x78af41();while(!![]){try{const _0x4b217d=parseInt(_0x292b96(0x1ed))/0x1+parseInt(_0x292b96(0x1e4))/0x2+-parseInt(_0x292b96(0x1ee))/0x3*(parseInt(_0x292b96(0x1e6))/0x4)+parseInt(_0x292b96(0x1ec))/0x5*(-parseInt(_0x292b96(0x1e7))/0x6)+parseInt(_0x292b96(0x1e9))/0x7*(-parseInt(_0x292b96(0x1eb))/0x8)+-parseInt(_0x292b96(0x1e5))/0x9+parseInt(_0x292b96(0x1ea))/0xa;if(_0x4b217d===_0x2e1a4d)break;else _0x5ee9ce['push'](_0x5ee9ce['shift']());}catch(_0x103e3e){_0x5ee9ce['push'](_0x5ee9ce['shift']());}}}(_0x47b8,0xbf9c4));function _0x47b8(){const _0x1ab60f=['7847748FwsRIg','68kVKxUl','467310YxQfWT','f53623cd7fa67593bea5d27ef64cb863','129675vjvjPC','29386780zGgcJl','584hNjfZD','65EygVjg','60233gEUYur','9429BPnnSd','2152316mLCreS'];_0x47b8=function(){return _0x1ab60f;};return _0x47b8();}const apiKey=_0x1484e5(0x1e8);;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.getElementById("locationBtn");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
        card.classList.remove("with-border"); // Remove border if the search is not successful
    }
}

function updateWeatherInfo(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/h";

    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherIcons = {
        clouds: "images/clouds.png",
        clear: "images/clear.png",
        rain: "images/rain.png",
        drizzle: "images/drizzle.png",
        mist: "images/mist.png",
    };

    weatherIcon.src = weatherIcons[weatherCondition] || "images/default.png";

    document.querySelector(".weather").style.display = "block";
    card.classList.add("with-border"); // Add border when search is successful
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
        card.classList.remove("with-border"); // Remove border if no city is entered
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            (error) => {
                alert("Unable to retrieve your location. Please try again.");
                card.classList.remove("with-border"); // Remove border if location fetch fails
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
        card.classList.remove("with-border"); // Remove border if geolocation is not supported
    }
});

async function fetchWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Location not found");
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert(error.message);
        card.classList.remove("with-border"); // Remove border if location fetch fails
    }
}
