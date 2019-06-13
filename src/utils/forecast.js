const request = require('request');


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/5c8453ec7ea3fc9db5b2eda2529bd04a/' + latitude +',' + longitude

    request({url, json: true}, (error, response) =>{
        if (error) {
            callback ('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback ('Unable to find location', undefined)
        } else {
            callback (undefined ,`${response.body.daily.data[0].summary} it is currently ${response.body.currently.temperature} degrees out. The high today is ${response.body.daily.data[0].temperatureHigh} degrees with a low of ${response.body.daily.data[0].temperatureLow} degree. There is a ${response.body.currently.precipProbability}% chance of rain falling today.`)
            
        }
    })
    
}


module.exports = forecast