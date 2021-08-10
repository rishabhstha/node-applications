const mongoose= require('mongoose')
const validator= require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})

// Creating a model for User
const User=mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim:true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Please choose another password')
            }
        }
    }
})

//Create a model for task
const Task=mongoose.model('Task',{
    description: {
        type:String
    },
    completed:{
        type: Boolean
    }

})

// Creating an instance of Task model
// const read= new Task({
//     description: "Read",
//     completed: false
// })

// read.save().then(()=>{
//     console.log(read)
// }).catch((error)=>{
//     console.log(error)
// })

//Creating a model for User
const me= new User({
    name:'  Rishabh  ',
    email: 'MYEMAIL@GMAIL.COM  ',
    password: "heythere123! "
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error', error)
})