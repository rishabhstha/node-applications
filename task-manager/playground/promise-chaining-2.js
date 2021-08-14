require('../src/db/mongoose')
const Task= require('../src/models/task')

Task.findByIdAndDelete('6112ba8c73904c03a445ad3c').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})