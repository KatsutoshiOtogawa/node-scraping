// model配下の各処理へのエントリーポイントです。
import { Model } from '../model'
import { ArgsForModel } from '../lib/config'
// import { Model } from './model'
import { Command } from 'commander'
import { logger } from '../lib/log'

/**
 * 各処理を外部から呼び出すための処理です。
 */
function invoke () {
  // ここから別の関数に分ける。
  const program = new Command()

  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza')
    .option('-m, --model-name <modelName>', '実行するモデル名です。')
    .option('-f, --func-name <funcName>', '実行する関数名です。')

  program.parse(process.argv)

  const options = program.opts()

  if (options.debug) logger.info(options)
  logger.info('pizza details:')
  if (options.small) logger.info('- small pizza size')
  if (options.pizzaType) console.log(`- ${options.pizzaType}`)

  const modelName:string = options.modelName ?? ''
  const funcName:string = options.funcName ?? ''

  // modelName,funcNameがちゃんと渡されているなら処理を呼び出す。
  if (modelName && funcName) {
    logger.info('モデル')
    const argsForModel = new ArgsForModel(modelName, funcName, logger)
    // 処理呼び出し。
    Model.invoke(argsForModel)
  }
}

const Cli = {
  invoke: invoke
}

export {
  Cli
}
