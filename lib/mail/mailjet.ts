import mailjet from 'node-mailjet'
import winston from 'winston'

const mjApikeyPublic = process.env.MJ_APIKEY_PUBLIC ?? ''
const mjApikeyPrivate = process.env.MJ_APIKEY_PRIVATE ?? ''

const client = mailjet.connect(mjApikeyPublic, mjApikeyPrivate)

client.post('send', { version: 'v3.1' })

function sendMail (logger: winston.Logger) {
  const request = client
    .post('contact')
    .request({
      Email: 'passenger@mailjet.com',
      IsExcludedFromCampaigns: true,
      Name: 'New Contact'
    })

  request
    .then((result) => {
      logger.info(result.body)
    })
    .catch((err) => {
      logger.info(err.stack)
      logger.info(err.statusCode)
    })
}

const Mailjet = {
  client: client,
  sendMail: sendMail
}
export {
  Mailjet
}
