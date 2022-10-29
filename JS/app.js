let cityform = document.querySelector('form')
let card = document.querySelector(".card")   //for ui interface
let details = document.querySelector(".details")  //for ui interface
let time = document.querySelector("img.time")      //for time
let icon = document.querySelector(".icon img")         //for time




let updateUi = (data) => {

    let citydel = data.citydel
    let weather = data.weather
    console.log(data);

    //destructuring properties
    // let {citydel,weather}= data


    details.innerHTML = `<h5 class="my-3">${citydel.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
      </div>
    `

    if (card.classList.contains('d-none')) {      //d-none i bootstrap class in card class in html
        card.classList.remove('d-none')
    }

    //update day and night image
   

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = '../images/day.svg'
    }else{
        timeSrc='../images/night.svg'
    }
    time.setAttribute('src',timeSrc)


    //updating the weather icon
    
    // let weatherIcon=null;
    // if(weather.WeatherIcon===12){
    //     weatherIcon='images/12.svg'
    // }
    // icon.setAttribute("src",weatherIcon)

    let iconSrc=`../images/${weather.WeatherIcon}.svg`
    icon.setAttribute("src",iconSrc)
    

}







let updatecity = async (city) => {
    // console.log(city);
    const citydel = await getCity(city);
    const weather = await cityWeather(citydel.Key);   //we are calling them get city and weather form weather.js and weather.js is decleard in weather project so we can do this

    return {
        citydel: citydel,
        weather: weather
    }
}


// console.log(cityform);
cityform.addEventListener("submit", (e) => {
    e.preventDefault()

    //getting city value when we type in box
    let city = cityform.city.value.trim()      //in this city is the name in html form
    //    console.log(city);
    cityform.reset()                           //to reset after every use



    //update the ui with new city
    updatecity(city).then((data) => {           //calling the function
        updateUi(data);                         //calling uiupdate function
    }).catch((err) => {
        console.log(err.message);
    })

    //setting city to local storage
    localStorage.setItem("city",city)         //everytime we type new city it reloads it
    
})

// if(localStorage.getItem('city')){
//     updatecity(localStorage.getItem("city"))
//     .then(data=> updateUi(data))
//     .catch(err=> console.log(err))
  
// }

