// model配下の各処理へのエントリーポイントです。
import { Model } from '../model'
import { ArgsForModel } from '../lib/config'
// import { Model } from './model'
import { Command } from 'commander'
import { logger } from '../lib/log'
import { app } from '../httpserver'

/**
 * 各処理を外部から呼び出すための処理です。
 */
function invoke ():void {
  // ここから別の関数に分ける。
  const program = new Command()

  program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza')
    .option('-m, --model-name <modelName>', '実行するモデル名です。')
    .option('-f, --func-name <funcName>', '実行する関数名です。')
    .option('-r, --runhttp')

  program.parse(process.argv)

  const options = program.opts()

  if (options.debug) logger.info(options)
  logger.info('pizza details:')
  if (options.small) logger.info('- small pizza size')
  if (options.pizzaType) console.log(`- ${options.pizzaType}`)

  const modelName:string = options.modelName ?? ''
  const funcName:string = options.funcName ?? ''
  const runhttp:boolean = options.runhttp ?? false

  if (runhttp) {
    app.listen(3000)
    return
  }

  // modelName,funcNameがちゃんと渡されているなら処理を呼び出す。
  if (modelName && funcName) {
    const argsForModel = new ArgsForModel(
      modelName,
      funcName,
      logger
    )
    // 処理呼び出し。
    Model.invoke(argsForModel)
  } else {
    logger.error('モデル名か関数名が選択されていません。')
  }
}

const Cli = {
  invoke: invoke
}

export {
  Cli
}
