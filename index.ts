import 'reflect-metadata'
import { db } from './lib/db'
import { logger } from './lib/log'
import { Cli } from './cli'

// err時のstack traceを表示させるために必要。
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

Cli.invoke()

db.pool.connect((err, client, release) => {
  if (err) {
    logger.error(err.message)
    logger.error(err.stack)
    throw err
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      logger.error(err.message)
      logger.error(err.stack)
      throw err
    }
    logger.info(result.rows)
  })
})
