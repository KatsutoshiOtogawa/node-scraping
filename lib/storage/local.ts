import winston from 'winston'
import fs from 'fs'
import path from 'path'

const localStorage = process.env.LOCAL_STORAGE ?? ''

// fileNameはパス含む
function upload (fileName: string, logger: winston.Logger) {
  const src = fs.createReadStream(fileName)
  const dest = fs.createWriteStream(path.join(localStorage, path.basename(fileName)), 'utf8')
  src.pipe(dest)
  logger.info(`${fileName} uploaded to ${localStorage}`)
}

const Local = {
  upload: upload
}
export {
  Local
}
