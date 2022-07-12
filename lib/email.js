import nodemailer from 'nodemailer'

module.exports = class Email {
  constructor(user, authToken) {
    this.to = user.email
    this.authToken = authToken
    this.fromEmail = 'rutimesharing@gmail.com'
    this.fromName = 'Time Sharing'
  }

  async sendMagicLink() {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.fromEmail,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      to: this.to,
      from: `"${this.fromName}" <${this.fromEmail}>`, // sender address
      subject: 'Регистрация на сайте timesharing', // Subject line
      text: 'Подтверждение регистрации', // plain text body
      html: `<b>Привет!</b>
      <p>Осталось совсем немного, Вам нужно подтвердить свою эл. почту.</p>
      <a href="${process.env.NEXTAUTH_URL}/api/users/authVerify/${this.authToken}">Подтвердить</a>`, // html body
    }

    await transporter
      .sendMail(mailOptions)
      .then(() => {}, console.error)
      .catch((e) => console.log(e))
  }
}
