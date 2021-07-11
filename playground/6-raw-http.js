const http=require('http')
const url='http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query=37.27,43.3&units=f'


const request=http.request(url, (response)=>{
    let data =''

    response.on('data',(chunk)=>{
        data=data+chunk.toString()

    })

    response.on('end',()=>{
        const body=JSON.parse(data)
        console.log(body)

    })
})

request.on('error',(error)=>{
    console.log('An error',error)

})

request.end()