const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"
//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


sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
    to: 'rishabhstha@gmail.com',
    from: 'rishabhstha@gmail.com',
    subject: 'This is my first creation!',
    text: 'Hope you get this email'
})
//