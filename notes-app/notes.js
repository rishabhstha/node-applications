const chalk= require('chalk')
const fs=require('fs');


const getNotes=()=>{
    return "Your notes...";
}

const addNote=(title, body)=>{
    const notes=loadNotes()

    //const duplicateNotes=notes.filter((note)=>note.title===title)
    const duplicateNote=notes.find((note)=>note.title===title)
    debugger
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log('New note added!')
    }
    else{
            console.log('Note title taken!')
        }
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes= () =>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
     
}

const removeNote=(title)=>{

    const notes=loadNotes()

    const newNotes=notes.filter((note)=>note.title!==title)
    if(notes.length===newNotes.length){
        console.log(chalk.bgRed("No such note found"))
       
    }else{
    saveNotes(newNotes)
    console.log(chalk.bgGreen("Note-"+title+" removed!"))
    }
}

const listNotes= () =>{
   const notes= loadNotes()
   console.log(chalk.inverse("Your notes"))
   notes.forEach((note)=>{
       console.log(note.title)
   })

}

const readNote=(title)=>{
    const notes=loadNotes()
    const findNote=notes.find((note)=>note.title===title)
    
    if(findNote){
        console.log(chalk.bold.blue("Title: "+title));
        console.log("Body: "+findNote.body)
    }
    else{
        console.log(chalk.red("No such note found"))
    }
   console.log(typeof findNote)
}

module.exports={
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}