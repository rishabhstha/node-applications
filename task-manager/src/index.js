const express = require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task= require('./models/task')

const app= express()
const port=process.env.PORT || 3000

app.use(express.json())

//Writing new user
app.post('/users',(req, res)=>{
    // console.log(req.body)
    // res.send('testing!')

    const user= new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400).send(error)
       
    })
})

//Reading users endpoint
//gets all the users
app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//getting one user
app.get('/users/:id', (req,res)=>{
    const _id= req.params.id
    console.log(_id)
    User.findById(_id).then((user)=>{
        // if(!user){
        //     return res.status(404).send(user)
        // }
      res.send(user)
    }).catch((e)=>{
        if(e.name === 'CastError'){
            return res.status(404).send('Invalid id')
        }
        return res.status(500).send(e)
    })
    
    // console.log(req.params)
})

//writing one task
app.post('/tasks',(req, res)=>{

    const task= new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Create an endpoint for fetching all tasks
app.get('/tasks',(req,res)=>{
    console.log("aye")
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

//Create an endpoint for fetching task by its id
app.get('tasks/:id',(req,res)=>{
    console.log("aye")
    const _id = req.params.id
    console.log(_id)
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    }).catch((e)=>{
        res.status(500).send(e)
    })
})


app.listen(port, ()=>{
    console.log("Server is up on "+ port)
})