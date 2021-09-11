import 'reflect-metadata'
import { Model } from './model'
import { Command } from 'commander'
import { db } from './lib/db'
import { logger } from './lib/log'
import { ArgsForModel } from './lib/config'

// err時のstack traceを表示させるために必要。
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

const program = new Command()

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')
  // .option('-m, --model-name <modelName>', '実行するモデル名です。')
  // .option('-m, --model-name <modelName>', '実行するモデル名です。')

program.parse(process.argv)

const options = program.opts()

// console.log(options)

if (options.debug) logger.info(options)
logger.info('pizza details:')
if (options.small) logger.info('- small pizza size')
if (options.pizzaType) console.log(`- ${options.pizzaType}`)

// options.modelName

const argsForModel = new ArgsForModel('Amazon', 'search', logger)

// 処理呼び出し。
Model.invoke(argsForModel)

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
