import winston from 'winston'
import { Gcp } from './gcp'
import { Local } from './local'

let logger: winston.Logger

if (process.env.GOOGLE_CLOUD_PROJECT) {
  logger = Gcp.logger
} else {
  logger = Local.logger
}

export {
  logger
}
