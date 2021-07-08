const request=require('postman-request')

const forecast=(long,lat,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query='+lat+','+long+'&units=f'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)

        }else if(response.body.error){
            callback('Unable to find the location!', undefined)
        }else{
            callback(undefined,               
                response.body.current.weather_descriptions[0]+`. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
            )
        }
    })
}

module.exports=forecast
