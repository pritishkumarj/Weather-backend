const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
        
        // Handle server errors (500, 400, etc.)
        if (!response.ok) {
            document.querySelector(".error").classList.add("show");
            document.querySelector(".weather").classList.remove("show");
            console.error('Server error:', data.error);
            return;
        }
        
        // Handle OpenWeather API errors (city not found, etc.)
        if (data.cod && data.cod !== 200) {
            document.querySelector(".error").classList.add("show");
            document.querySelector(".weather").classList.remove("show");
            console.error('Weather API error:', data.message);
            return;
        }
        
        // Valid weather data - update the UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        
        document.querySelector(".weather").classList.add("show");
        document.querySelector(".error").classList.remove("show");
        
    } catch (error) {
        // Handle network errors or JSON parsing errors
        console.error('Error fetching weather data:', error);
        document.querySelector(".error").classList.add("show");
        document.querySelector(".weather").classList.remove("show");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});