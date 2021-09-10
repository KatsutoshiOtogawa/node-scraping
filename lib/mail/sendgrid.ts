import sgMail from '@sendgrid/mail'
import winston from 'winston'

const sendgridApiKey = process.env.SENDGRID_API_KEY ?? ''

sgMail.setApiKey(sendgridApiKey)

/**
 * sendGridを使った、メール送信です。
 * @param to メールの送信先です aaa@example.com.
 * @param from メールの送信元です bbb@example.com.
 * @param subject メールの件名です。
 * @param message メールの本文です。
 * @param logger winstonのloggerを渡してください。これを使ってログを吐きます。
 */
async function sendMail (to:string, from: string, subject: string, message: string, logger: winston.Logger) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  }

  await sgMail.send(msg).then((_) => {
    logger.info('success to sendGrid')
  }).catch((err) => {
    logger.error(err.message)
    logger.error(err.stack)
    throw err
  })

//   try {
//   } catch (err) {
//     // console.error(`${errorBase}: ${err.message}`)
//   }
}

const Sendgrid = {
  sendMail: sendMail
}
export {
  Sendgrid
}
