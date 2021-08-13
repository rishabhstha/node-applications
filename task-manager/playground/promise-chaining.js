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
 