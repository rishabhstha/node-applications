//CRUD operations

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const {MongoClient, ObjectId}= require('mongodb')

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.toHexString())
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error, client)=>{
    if(error) {
        return console.log('Unable to connect to database!')
    }
    
    const db= client.db(databaseName)

    // db.collection('users').findOne({_id:ObjectId("6101b5879fce66a024696931")},(error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age:22 }).toArray((error,users)=>{
    //     console.log(users)
    // })

    // db.collection('users').find({age: 22}).count((error,count)=>{
    //     console.log(count)
    // })


    //Finding documents for tasks collection
    db.collection('tasks').findOne({_id: ObjectId("6100ddf6acc4a7b996efbcaf")},(error,task)=>{
        if(error){
            return console.log("Unable to fetch!")
        }
        console.log(task)
    })

    //finding documents in tasks collection using find
    db.collection('tasks').find({completed:false}).toArray((error, tasks)=>{
        if(error){
            return console.log("Could not find documents")
        }
        console.log(tasks)
    })

//Inserting documents

    // db.collection('users').insertOne({
    //     _id: id,
    //     name:'Ryan',
    //     age: 23
    // }, (error, result)=>{
    //         if(error){
    //             return console.log('Unable to insert user')
    //         }

    //         console.log(result.insertedId)//ops is an array of documents

    // })

    // db.collection('users').insertMany([
    //     {
    //         name:'Jen',
    //         age:28
    //     },{
    //         name:"Gambler",
    //         age:25
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean',
    //         completed:false

    //     },{
    //         description:"Read",
    //         completed: true
    //     },{
    //         description: "Write",
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log("Tasks could not be added!")
    //     }
    //     console.log(result.insertedIds)
    // })  

})

