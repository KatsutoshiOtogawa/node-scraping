import { aaa } from './model'
import { Command } from 'commander'
import { db } from './lib/db'
import { logger } from './lib/log'

// err時のstack traceを表示させるために必要。
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install()

const program = new Command()

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log(options)
console.log('pizza details:')
if (options.small) console.log('- small pizza size')
if (options.pizzaType) console.log(`- ${options.pizzaType}`)

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
    // console.log(result.rows)
    logger.info(result.rows)
  })
})

aaa()
