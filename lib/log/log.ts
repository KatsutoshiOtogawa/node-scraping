import winston from 'winston'
import { setForGae } from './gcp'
// // Imports the Google Cloud client library for Winston
// import { LoggingWinston } from '@google-cloud/logging-winston'

const transports: winston.transport[] = [
  new winston.transports.Console()
]

// gaeを使っていたらそれ用のライブラリを使用
setForGae(transports)

// // gaeを使っていたら、ここに入る。
// if (process.env.GOOGLE_CLOUD_PROJECT) {
//   // Add Stackdriver Logging
//   // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
//   transports.push(new LoggingWinston())
// }

const logger = winston.createLogger({
  level: 'info',
  transports: transports
})

export {
  logger
}
