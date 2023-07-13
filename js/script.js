// 4b1bd181db7897937441cb42c69674e3
const apiKey = '4b1bd181db7897937441cb42c69674e3'
const apiFlagUrl = 'https://flagsapi.com/:country_code/:style/:size.png'
// flag url example
// https://flagsapi.com/BE/flat/64.png
// `https://flagsapi.com/${countryFlagCode}/flat/64.png`


let countryFlagCode = ''

const cityInput = document.querySelector('#cityInput')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weatherIcon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherData = document.querySelector('#weatherData')


// functions
const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)

    cityElement.innerText = data.name
    tempElement.innerHTML = parseInt((data.main.temp) - 273)
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute(
        'src', 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    )
    countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
    umidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${parseInt((data.wind.speed)*3.6)}km/h`

    weatherData.classList.remove('hide')
}


// events
searchBtn.addEventListener('click', (e)=>{

    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)

})

cityInput.addEventListener('keyup', (e) => {
    if(e.code === "Enter"){
        const city = e.target.value
        showWeatherData(city)
    }
})