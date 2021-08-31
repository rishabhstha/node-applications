const express = require('express')
const Task= require('../models/task')
const auth = require('../middleware/auth')

const router= new express.Router()

router.get('/test2', (req, res)=>{
    res.send("This is test router for task model")
})

//writing one task
router.post('/tasks', auth, async (req, res)=>{
    // const task= new Task(req.body)
   const task= new Task({
       ...req.body,
       owner: req.user._id

   })
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
//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async(req,res)=>{
    const match = {}
    const sort ={}

    if(req.query.completed){
        match.completed= req.query.completed=== 'true'
    }
    console.log(match.completed)
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc' ? -1 : 1 
    }

    try{
        // const tasks= await Task.find({owner:req.user._id, completed: match.completed})
       await req.user.populate({
           path:'tasks',
           match,
           options: {
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
           }
       }).execPopulate()
        res.send(req.user.tasks)
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
router.get('/tasks/:id',auth, async (req,res)=>{
    console.log("aye")
    const _id = req.params.id
    console.log(_id)
    try{
        // const task= await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})

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
router.patch('/tasks/:id',auth, async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try{
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id})
        // const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).send("Error: Task not found")
        }

        updates.forEach((update)=>{
            task[update]= req.body[update]
        })
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
        
        res.send(task)
    } catch (e){
         if(e.name === 'CastError'){
        return res.status(404).send('Invalid id')
    }
         res.status(500).send(e)
    }
})


//Deleting task by id
router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task= await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)  
    } catch(e){
        res.status(500).send(e)
    }
})

module.exports= router