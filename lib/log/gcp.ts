import winston from 'winston'
// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston'

// gaeを使っていたら、gae用のログ出力用のライブラリを使う。
function setForGae (transports: winston.transport[]) {
  // gaeを使っていたら、ここに入る。
  if (process.env.GOOGLE_CLOUD_PROJECT) {
    // Add Stackdriver Logging
    // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
    transports.push(new LoggingWinston())
  }
}

// Create a Winston logger that streams to Stackdriver Logging
export {
  setForGae
}
