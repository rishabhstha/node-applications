
// const square=(x) => x*x
// console.log(square(2))

const events = {
    name: 'Birthday Party',
    guestList:['Rishabh','Jen','Mike'],
    printGuestList() {
        console.log('Guest List for '+ this.name)

        this.guestList.forEach((guest)=>{
            console.log(guest+ ' is attending '+ this.name)
        })
    }
}

events.printGuestList()