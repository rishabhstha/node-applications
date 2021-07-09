const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//console.log(process.argv[2])
geocode(process.argv[2],(error, data)=>{
    if(error){
        return console.log('Error', error)
    }
  
    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if(error){
            return console.log('Error', error)
        }
        console.log(data.location)
        console.log(forecastData)
      })
})


