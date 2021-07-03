const tasks={
    tasks:[{
        text: 'Grocery shopping',
        completed:true
    }, {
        text:"Clean yard",
        completed:false
    },{
        text:'Film course',
        completed:false
    }],

    getTasksToDo(){
        console.log("Tasks To Do:")
        
        return this.tasks.filter((task)=>!task.completed)
    }
}

console.log(tasks.getTasksToDo())