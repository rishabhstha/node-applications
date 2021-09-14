const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'rishabhstha@gmail.com',
        subject: "Thanks for joining in!", 
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`

    })
}

const sendCancellationEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from: 'rishabhstha@gmail.com',
        subject: 'Account Cancellation Notice',
        text: `Your account is succcessfully Cancelled, ${name}! Please give us feedback!`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}

// sgMail.send({
//     to: 'rishabhstha@gmail.com',
//     from: 'rishabhstha@gmail.com',
//     subject: 'This is my first creation!',
//     text: 'Hope you get this email'
// })



//