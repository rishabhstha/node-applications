const mongoose=require('mongoose')


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