const path=require('path')

const express=require('express')

//console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app=express()
const publicDirectoryPath=path.join(__dirname, '../public')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rishabh Shrestha'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rishabh Shrestha'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1> Weather </h1>')
// })

//app.get('/help',(req, res)=>{
//     res.send([{
//         name:'Rishabh',
//         age:22
//     },{
//         name:'Andrea',
//         age:20
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
    
// })

// app.get('/about', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../public/about.html'))
// })
 
app.get('/help', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/help.html'))
})

app.get('/weather',(req,res)=>{
    res.send({
        location:"Philadelphia",
        forecast:"It is sunny out there"
    })
})
//app.com
app.listen(3000,()=>{
    console.log("Server is up on port 3000.")
})