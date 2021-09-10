import { Mailjet } from './mailjet'
import { Sendgrid } from './sendgrid'
import winston from 'winston'

/**
 * @param to Comment for parameter ´text´.
 */
function sendMail (to:string, from: string, subject: string, message: string, logger: winston.Logger) {
  if (process.env.MJ_APIKEY_PRIVATE) {
    Mailjet.sendMail(logger)
  } else if (process.env.SENDGRID_API_KEY) {
    Sendgrid.sendMail(to, from, subject, message, logger)
  }
}

const Mail = {
  sendMail: sendMail
}

export {
  Mail
}
