import { Storage } from '@google-cloud/storage'
import path from 'path'
import winston from 'winston'

const storage = new Storage()
const bucketName = process.env.GCLOUD_STORAGE_BUCKET ?? ''

// fileNameはパス含む
async function upload (fileName: string, logger: winston.Logger) {
  await storage.bucket(bucketName).upload(fileName, {
    destination: path.basename(fileName)
  })

  logger.info(`${fileName} uploaded to ${bucketName}`)
}

const Gcp = {
  storage: storage,
  upload: upload
}
export {
  Gcp
}
