import winston from 'winston'
import { Gcp } from './gcp'
import { Local } from './local'

/**
 * ファイルアップロードのentryPointです。環境変数によって、どのライブラリを使うのか決まります。
 * @param fileName パスを含むファイル名です
 * @param logger winstonのloggerを渡してください。これを使ってログを吐きます。
 */
async function upload (fileName: string, logger: winston.Logger) {
  if (process.env.GCLOUD_STORAGE_BUCKET) {
    Gcp.upload(fileName, logger)
    // uploadGcs().catch(console.error)
    // [END storage_upload_file]
  } else {
    Local.upload(fileName, logger)
  }
}

const Storage = {
  upload: upload
}
export {
  Storage
}
