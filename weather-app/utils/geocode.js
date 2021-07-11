const request=require('postman-request')

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmlzaGFiaHN0aGEiLCJhIjoiY2txcmE2c2x6MXA4czJ1bzh3aDZqc3UwZSJ9.f_hBTLICQKOvpfNmw8qYIg&limit=1'
    request({url, json:true},(error, {body}={})=>{ //destructuring resposne to body
      //  const {body}= response
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features===undefined){
            callback('Unable to find location. Try another search')
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode