const express= require('express')
const User=require('../models/user')
const auth = require('../middleware/auth')
const multer= require('multer')
const sharp = require('sharp')
const router= new express.Router()
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/account')



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
        sendWelcomeEmail(user.email, user.name)
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

//Logout from one session
router.post('/users/logout', auth, async(req, res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()

    }
})

//Logout from another session
router.post('/users/logoutAll', auth, async(req, res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//Reading users endpoint
//gets all the users
router.get('/users/me', auth, async(req,res)=>{
    res.send(req.user)
    // try{
    //     const users=await User.find({})
    //     res.send(users)
    // } catch (e){
    //     res.status(500).send()
    // }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

//getting one user
// router.get('/users/:id', async (req,res)=>{
//     const _id= req.params.id
//     // console.log(_id)
//     try{
//         const user= await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e){
//         if(e.name === 'CastError'){
//             return res.status(404).send('Invalid id')
//         }
//        res.status(500).send(e)
//     }
//     // User.findById(_id).then((user)=>{
//     //     // if(!user){
//     //     //     return res.status(404).send(user)
//     //     // }
//     //   res.send(user)
//     // }).catch((e)=>{
//     //     if(e.name === 'CastError'){
//     //         return res.status(404).send('Invalid id')
//     //     }
//     //     return res.status(500).send(e)
//     // })
    
//     // console.log(req.params)
// })

//Update individual user by id
router.patch('/users/me', auth, async(req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
       return res.status(400).send({error: 'Invalid updates!'}) 
    }
    try{
        // const user= await User.findById(req.params.id)

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  
        // if(!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (e){
         if(e.name === 'CastError'){
        return res.status(404).send('Invalid id')
    }
         res.status(500).send(e)
    }
})

//Deleting user by id
router.delete('/users/me', auth, async(req, res)=>{
    try{
        // const user= await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
       

        res.send(req.user)
    } catch (e){
        res.status(500).send()
    }
})

//Create a multer object for avatar
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a jpg/jpeg/png file!'))
        }
        cb(undefined, true)
    }
})

//route for uploading user's profile picture
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
 
    req.user.avatar= buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

//route for deleting avatar
router.delete('/users/me/avatar',auth, async (req, res)=>{
    try{
        req.user.avatar=undefined
        await req.user.save()
        res.send()
    } catch(e){
        res.status(500).send(e)
    }
})

//route for fetching avatar
router.get('/users/:id/avatar', async (req, res)=>{
    
    try{
        const user = await User.findById(req.params.id)   

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e){
        res.status(404).send()
    }
})

module.exports=router
