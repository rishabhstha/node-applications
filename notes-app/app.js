const chalk= require('chalk')
const yargs=require('yargs')

const notes=require('./notes.js')

//Customize yargs version
yargs.version('1.1.0')

//add, remove, read, list

//Create add command
yargs.command({
    command:'add',
    describe:'Adding a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command:'remove',
    describe:'Removing a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }

    },

    handler(argv){
        notes.removeNote(argv.title)
    }
})
 
yargs.command({
    command:'read',
    describe:'Reading a note',
    builder:{
        title:{
           describe:'Note title',
           demandOption:true,
           type:'string '
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'Listing your notes',
   
    handler(){
        notes.listNotes()
    }
})

yargs.parse()

//console.log(yargs.argv)





// const chalk=require('chalk');
// console.log(chalk.green('Success!!'))
// const error=chalk.red.inverse.bold;
// const warning=chalk.keyword('orange')
// console.log(error('Error'));
// console.log(warning('Warning!'))

// const myNotes=require('./notes.js')
// const msg=myNotes()
// console.log(msg)

// console.log(process.argv[2])



// const validator=require('validator')

// console.log(validator.isEmail('rishabhstha@gmail.com'))
// console.log(validator.isURL('https/mead.io'))

// const fs=require('fs')
// fs.writeFileSync('notes.txt','My name is Rishabh.')
// fs.appendFileSync('notes.txt',' I am 22 years old.')

// const add= require('./utils.js');
// const sum=add(4,-2)
// console.log(sum)

//Challenge
// const myNotes=require('./notes.js')
// const msg=myNotes()
// console.log(msg)
