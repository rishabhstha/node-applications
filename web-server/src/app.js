const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
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

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful message",
        title:'Help',
        name:'Rishabh Shrestha'

    })
})

app.get('/weather',(req,res)=>{
    res.send({
        location:"Philadelphia",
        forecast:"It is sunny out there"
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:"Error 404",
        errorText:"Help article not found",
        name:"Rishabh Shrestha"
    })
    
})

app.get('*',(req, res)=>{
    res.render('error',{
        title:"Error 404",
        errorText:"Page not found",
        name:"Rishabh Shrestha"
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
 
// app.get('/help', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../public/help.html'))
// })


//app.com
app.listen(3000,()=>{
    console.log("Server is up on port 3000.")
})