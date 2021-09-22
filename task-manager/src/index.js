const express = require('express')
require('./db/mongoose')

const userRouter= require('./routers/user')
const taskRouter= require('./routers/task')

const app= express()
const port=process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Without middleware: new request-> run route handler
//With-middleware: new request -> do something -> run route handler


app.listen(port, ()=>{
    console.log("Server is up on "+ port)
})

// const multer= require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//             fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a  word document!'))
//         }
//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined,true)
//         // cb(undefined, false)
//     }
// })



// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })

// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

//Setup middleware for maintaineance mode
// app.use((req, res, next)=>{
//     res.status(503).send("Site under maintenance")
// })

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async()=>{

    // const user = await User.findById('612b03d9176c00f408ce816e')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
    // const task = await Task.findById('612b0b9041ec2ffdbc05a8f7')
    // // console.log(task)
    
    // await task.populate('owner').execPopulate()
    // console.log(task)
    // // console.log(task.owner)
// }
// main()

// const pet ={
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const myFunction = async () =>{
//     const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn: '7 days' }) //creating a jwt
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }


// myFunction()