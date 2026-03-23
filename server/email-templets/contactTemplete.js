const { baseTamplet } = require("./basedTemplet")

exports.contactTemplete = ({ name }) => {
    const content = `
    <h2>This is Madhura,</h2>
    <p>Hi, ${name}</p>
    <p>Thank you for reaching out through my portfolio and for interest in my work</p>
    `
    return baseTamplet({
        title: "welcome to SKILLHUB",
        content
    })
}

exports.contactTempleteGetReply = ({ name, message }) => {
    const content = `
    <h2>portfolio message from  ${name},</h2>
    <p>Hi,</p>
    <p>${message}</p>
    `
    return baseTamplet({
        title: "welcome to SKILLHUB",
        content
    })
}