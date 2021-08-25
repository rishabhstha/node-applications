const express= require('express')
const User=require('../models/user')



const router= new express.Router()

router.get('/test', (req,res)=>{
    res.send("This is from my other router")
})



//Writing new user
router.post('/users',async(req, res)=>{
    // console.log(req.body)
    // res.send('testing!')

    const user= new User(req.body)
       
    try{
        await user.save()
        const token= await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }

    // const user= new User(req.body)
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
       
    // })
})

//User authentication
router.post('/users/login', async(req, res)=>{
    try{
        const user= await User.findByCredentials(req.body.email, req.body.password)
        const token= await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

//Reading users endpoint
//gets all the users
router.get('/users',async(req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    } catch (e){
        res.status(500).send()
    }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

//getting one user
router.get('/users/:id', async (req,res)=>{
    const _id= req.params.id
    // console.log(_id)
    try{
        const user= await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        if(e.name === 'CastError'){
            return res.status(404).send('Invalid id')
        }
       res.status(500).send(e)
    }
    // User.findById(_id).then((user)=>{
    //     // if(!user){
    //     //     return res.status(404).send(user)
    //     // }
    //   res.send(user)
    // }).catch((e)=>{
    //     if(e.name === 'CastError'){
    //         return res.status(404).send('Invalid id')
    //     }
    //     return res.status(500).send(e)
    // })
    
    // console.log(req.params)
})

//Update individual user by id
router.patch('/users/:id', async(req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
       return res.status(400).send({error: 'Invalid updates!'}) 
    }
    try{
        const user= await User.findById(req.params.id)

        updates.forEach((update)=>{
            user[update] = req.body[update]
        })

        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e){
         if(e.name === 'CastError'){
        return res.status(404).send('Invalid id')
    }
         res.status(500).send(e)
    }
})

//Deleting user by id
router.delete('/users/:id', async(req, res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (e){
        res.status(500).send()
    }
})

module.exports=router
