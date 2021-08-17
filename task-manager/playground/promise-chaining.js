require('../src/db/mongoose')
const User= require('../src/models/user')


// 6111b0c408f2c14af08ab2ec


User.findByIdAndUpdate('6111b4dbc3600650283b78e3', {age :1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age :1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

const updateAgeCount=async(id, age)=>{
    const user=await User.findByIdAndDelete(id, {age})
    const count= await User.countDocuments({age})
    return count
}
 
updateAgeCount('611308eb8f1d5a4d241ffd83',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})