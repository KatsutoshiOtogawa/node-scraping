import winston from 'winston'
import { uploadGcs } from './gcp'
import { uploadLocal } from './local'

// fileNameはパス含む
async function upload (fileName: string, logger: winston.Logger) {
  if (process.env.GCLOUD_STORAGE_BUCKET) {
    uploadGcs(fileName, logger)
    // uploadGcs().catch(console.error)
    // [END storage_upload_file]
  } else {
    uploadLocal(fileName, logger)
  }
}

// ifprocess.env.GCLOUD_STORAGE_BUCKET

// const storage = new Storage()

// async function uploadGcs (storage: Storage, bucketName: string, filePath: string, fileName: string, logger: winston.Logger) {
//   await storage.bucket(bucketName).upload(path.join(filePath, fileName), {
//     destination: fileName
//   })

//   // console.log(`${filePath} uploaded to ${bucketName}`);
//   logger.info(`${fileName} uploaded to ${bucketName}`)
// }

// const fileupload: (filePath: string, fileName: string, logger: winston.Logger)
// uploadGcs().catch(console.error)
// [END storage_upload_file]

export {
  upload
}
