import { Mailjet } from './mailjet'
import winston from 'winston'

function sendMail (logger: winston.Logger) {
  if (process.env.MJ_APIKEY_PRIVATE) {
    Mailjet.sendMail(logger)
  }
}

const Mail = {
  sendMail: sendMail
}

export {
  Mail
}
