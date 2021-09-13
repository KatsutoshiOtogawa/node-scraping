import path from 'path/posix'
import winston, { format } from 'winston'

// function getLabel (callingModule: any): winston.Logform.Format {
//   const parts = callingModule.filename.split('/')
//   // return parts[parts.length - 2] + '/' + parts.pop()
//   return new winston.Logform.Format({
//     message: parts[parts.length - 2] + '/' + parts.pop()
//   })
// }

const logDir = process.env.LOG_DIR ?? './log'

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
    new winston.transports.File({
      filename: path.join(logDir, 'application-.log')
    })
  ]
})

const Local = {
  logger: logger
}

export {
  Local
}
