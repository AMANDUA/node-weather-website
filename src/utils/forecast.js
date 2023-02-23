const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=89025d7f1b7964e945fded18a9c9eb7f&query='+ latitude + ',' + longitude+'&units=f';

    request({url, json: true}, (error, {body} = {}) => {
        const {error: bodyError, current} = body;
        
        if(error) {
            callback("Something went wrong!!", undefined)
        } else if(bodyError) {
            callback("Unable to find forecast for the given location!!", undefined)
        } else {
            const {weather_descriptions, temperature, precip, feelslike } = current
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. There is a ${precip}% chance of rain`)
        }
    })
}

module.exports = forecast