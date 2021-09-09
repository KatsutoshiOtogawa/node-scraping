import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ]
})

const Local = {
  logger: logger
}

export {
  Local
}
