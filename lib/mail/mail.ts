import { Mailjet } from './mailjet'
import { Sendgrid } from './sendgrid'
import winston from 'winston'

/**
 * メール送信に対するentryPointです。環境変数によって、どのライブラリを使うのか決まります。
 * @param to メールの送信先です aaa@example.com.
 * @param from メールの送信元です bbb@example.com.
 * @param subject メールの件名です。
 * @param message メールの本文です。
 * @param logger winstonのloggerを渡してください。これを使ってログを吐きます。
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
