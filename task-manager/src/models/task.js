const { MongoServerError } = require('mongodb')
const mongoose=require('mongoose')
const validator= require('validator')


//Create a model for task
const Task=mongoose.model('Task',{
    description: {
        type:String,
        required: true,
        trim:true
    },
    completed:{
        type: Boolean,
        default: false
    }

})

module.exports=Task