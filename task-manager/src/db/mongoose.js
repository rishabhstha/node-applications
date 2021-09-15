const mongoose= require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})



//Creating a model for User
// const me= new User({
//     name:'  Rishabh  ',
//     email: 'MYEMAIL@GMAIL.COM  ',
//     password: "heythere123! "
// })

// me.save().then(()=>{   
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)
// })



//Create a model for task
// const Task=mongoose.model('Task',{
//     description: {
//         type:String,
//         required: true,
//         trim:true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     }

// })


// Creating an instance of Task model
// const read= new Task({
//     description: "Write   "
//     // completed: false
// })

// read.save().then(()=>{
//     console.log(read)
// }).catch((error)=>{
//     console.log(error)
// })
