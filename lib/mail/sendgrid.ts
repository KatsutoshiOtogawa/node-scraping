import sgMail from '@sendgrid/mail'
import winston from 'winston'

const sendgridApiKey = process.env.SENDGRID_API_KEY ?? ''

sgMail.setApiKey(sendgridApiKey)

/**
 * sendMail
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
