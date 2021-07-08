
const request=require('postman-request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// const url="http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query=37.8267,-122.4233&units=f"
// // 37.8267,-122.4233


// request({ url: url, json:true }, (error, response)=>{
//     // console.log(response.body.current)
//     if(error){
//         console.log("Could not conenct to weatehr service!")
//     }else if (response.body.error){
//         console.log('Unable to find location')
//     }else{
//         currentData=response.body.current
//         console.log(response.body.current.weather_descriptions[0]+`. It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} degrees out.`)
//     }
// })





geocode('Boston',(error, data)=>{
    console.log('Error', error)
    console.log('Data', data)
})


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


forecast('-75.7a088', 'd44.1545', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
