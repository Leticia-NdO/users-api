import nodemailer from 'nodemailer'

const user = process.env.TEST_EMAIL
const pass = process.env.TEST_PASSWORD

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: user,
        pass: pass
    }
})

export default transporter