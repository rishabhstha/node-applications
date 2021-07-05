
const request=require('postman-request')

const url="http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query=37.8267,-122.4233"

request({ url: url }, (error, response)=>{
    const data=JSON.parse(response.body)
    console.log(data.current)
})

// console.log('Starting')

// setTimeout(()=>{
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(()=>{
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')