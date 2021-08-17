require('../src/db/mongoose')
const { findByIdAndDelete } = require('../src/models/task')
const Task= require('../src/models/task')

// Task.findByIdAndDelete('6113087010ebdd4968e553ab').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskcount= async(id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count= await Task.countDocuments({completed: false})
    return count
}

deleteTaskcount('611307b80acd1b4cfc628cd3').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})

