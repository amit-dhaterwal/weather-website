const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/9ec96f74e320ed6ecb2e94cb02cd5ae1/'+ latitude +',' +longitude +'?units=si'
    request({url,json: true},(error,{body}) => {
        if (error) {
            callback('can not connect to internet',undefined)
        } else if (body.error){
            callback("location not found",undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast;

