const request = require('request');

const forecaste = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?4d29543977543266d1117687dcfca15a/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to connect to weather service!', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + ' . There is a ' + body.currently.precipProbability + '% chance of rain ' )
        }
    })
}

module.exports = forecaste