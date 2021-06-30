const fs=require('fs')

//const book={
//    title:'Ego is the enemy',
//    author:'Ryan Holiday'
//}

//const bookJSON=JSON.stringify(book)
//fs.writeFileSync('1-json.json',bookJSON)

const dataBuffer=fs.readFileSync('1-json.json') 
const dataJSON=dataBuffer.toString()
console.log(dataJSON)
const data=JSON.parse(dataJSON)

data.name="Rishabh"
data.age=22

console.log(data)
newJSON=JSON.stringify(data)
fs.writeFileSync('1-json.json',newJSON)