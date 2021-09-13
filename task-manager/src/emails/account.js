const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"
//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


sgMail.setApiKey(sendgridAPIKey)

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