const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})

const User=mongoose.model('User', {
    name: {
        type:String
    },
    age:{
        type: Number
    }
})

const Task=mongoose.model('Task',{
    description: {
        type:String
    },
    completed:{
        type: Boolean
    }

})

// Creating an instance of Task model
const read= new Task({
    description: "Read",
    completed: false
})

read.save().then(()=>{
    console.log(read)
}).catch((error)=>{
    console.log(error)
})

//Creating a model for User
// const me= new User({
//     name: 'Rishabh',
//     age: 'Yes'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error', error)
// })