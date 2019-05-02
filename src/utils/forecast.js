const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/7084519ac6ffa822def781ae2281afaf/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url , json : true}, (error ,{body})=>{
        if(error)
            {
                callback('Unable to connect',undefined)
            }
        else if (body.error)
            {
                callback('Unable to find location',undefined)
            }
        else
        {
                callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' celcius degress out. There is a '+body.currently.precipProbability+'% chance of rain.')
        }
    })

}

module.exports=forecast