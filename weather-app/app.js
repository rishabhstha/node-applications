
const request=require('postman-request')

const url="http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query=37.8267,-122.4233&units=f"
// 37.8267,-122.4233


request({ url: url, json:true }, (error, response)=>{
    // console.log(response.body.current)
    if(error){
        console.log("Could not conenct to weatehr service!")
    }else if (response.body.error){
        console.log('Unable to find location')
    }else{
        currentData=response.body.current
        console.log(response.body.current.weather_descriptions[0]+`. It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} degrees out.`)
    }
})

//Geocoding 
const geo_url="https://api.mapbox.com/geocoding/v5/mapbox.places/Philadelphia.json?access_token=pk.eyJ1IjoicmlzaGFiaHN0aGEiLCJhIjoiY2txcmE2c2x6MXA4czJ1bzh3aDZqc3UwZSJ9.f_hBTLICQKOvpfNmw8qYIg&limit=1"

request({url:geo_url, json:true}, (error, response)=>{
    if(error){
        console.log("Unable to connect to location services!")
    } else if(response.body.features==undefined){
        console.log("Location could not be found")  
        
     } else{
        geocode=response.body.features[0].center
        const lat=geocode[1]
        const long=geocode[0]
        console.log(lat, long)
    }
})

