const API_KEY = "f11fd98483fa245ddc4ff8b9b543b4af";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child")
            const city = document.querySelector("#weather span:last-child")
        city.innerText = data.name;
        const temperature = Math.floor(data.main.temp);
        weather.innerText = `${data.weather[0].main} / ${temperature}℃`;
    });



}
function onGeoError(){
    alert("Can't find you. No weather for you.");
}



navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);






