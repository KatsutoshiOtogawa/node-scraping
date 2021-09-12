import winston, { format } from 'winston'
// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston'

const loggingWinston = new LoggingWinston()

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // Add Stackdriver Logging
    loggingWinston
  ]
})

// // gaeを使っていたら、gae用のログ出力用のライブラリを使う。
// function setForGae (transports: winston.transport[]) {
//   // gaeを使っていたら、ここに入る。
//   if (process.env.GOOGLE_CLOUD_PROJECT) {
//     // Add Stackdriver Logging
//     // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
//     transports.push(new LoggingWinston())
//   }
// }

const Gcp = {
  logger: logger
}
// Create a Winston logger that streams to Stackdriver Logging
export {
  Gcp
}
