const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const address=process.argv[2]

if(!address){
    console.log("Please provide a address!")
}else{

    geocode(address,(error, {latitude, longitude, location}={})=>{  //destructuring data returned to latitude, longitude, location
      //  const {latitude, longitude, location}= data
        if(error){
            return console.log('Error', error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log('Error', error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}


