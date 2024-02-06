const apiKey = "e19bd374ff2a6024d4be1d7ba7076ea1";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city);

        if (response.status === 404) {
            document.querySelector(".error").innerHTML = "City not found. Please enter a valid city name.";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            const weatherMain = data.weather[0].main.toLowerCase();
            if (weatherMain === "clouds") {
                weathericon.src = "images/clouds.png";
            } else if (weatherMain === "clear") {
                weathericon.src = "images/clear.png";
            } else if (weatherMain === "rain") {
                weathericon.src = "images/rain.png";
            } else if (weatherMain === "drizzle") {
                weathericon.src = "images/drizzle.png";
            } else if (weatherMain === "mist") {
                weathericon.src = "images/mist.png";
            }
            
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    } finally {
        document.querySelector(".error").style.display = response.status === 404 ? "block" : "none";
        document.querySelector(".weather").style.display = response.status === 404 ? "none" : "block";
        weathericon.src = "";
    }
}

searchbtn.addEventListener("click", (event) => {
    event.preventDefault();
    checkWeather(searchbox.value);
});
