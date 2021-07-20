console.log('Client side javascript file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherData = document.querySelector('#weather-data')
const locationData = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    locationData.textContent = 'Loading...'
    weatherData.textContent = ''

    fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if (data.error){
            search.value = ''
            return locationData.textContent = data.error
        }

        locationData.textContent = data.location
        weatherData.textContent = `${data.description}. It is ${data.temperature} degrees celcius outside. \nfeels like ${data.feelslike}.`
        search.value = ''
    })
})
})