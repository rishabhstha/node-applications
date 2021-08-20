const express = require('express')
const Task= require('../models/task')

const router= new express.Router()

router.get('/test2', (req, res)=>{
    res.send("This is test router for task model")
})

module.exports= router

//writing one task
router.post('/tasks',async (req, res)=>{

    const task= new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)     
    } catch (e){
        res.status(400).send(e)
    }

    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

// Create an endpoint for fetching all tasks
router.get('/tasks', async(req,res)=>{
    console.log("aye")

    try{
        const tasks= await Task.find({})
        res.send(tasks)
    } catch(e){
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

//Create an endpoint for fetching task by its id
router.get('/tasks/:id',async (req,res)=>{
    console.log("aye")
    const _id = req.params.id
    console.log(_id)
    try{
        const task= await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)

    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

//Create an endpoint to allow for task updates
router.patch('/tasks/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
        if(!task) {
            return res.status(404).send("Error: Task not found")
        }
        res.send(task)
    } catch (e){
         if(e.name === 'CastError'){
        return res.status(404).send('Invalid id')
    }
         res.status(500).send(e)
    }
})


//Deleting task by id
router.delete('/tasks/:id', async(req, res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)  
    } catch(e){
        res.status(500).send(e)
    }
})