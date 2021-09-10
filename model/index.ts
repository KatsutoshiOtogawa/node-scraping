
// model配下の各処理へのエントリーポイントです。
import { Amazon } from './amazon'
import { ArgsForModel } from '../lib/config'

/**
 * 各モデルへのエントリーポイントです。
 * @param argsForModel configのargsModelです。
 */
function invoke (argsForModel: ArgsForModel) {
  switch (argsForModel.modelName) {
    case 'Amazon':
      Amazon.invoke(argsForModel)
      break
    default:
      // const err = Error('Not such function exists')
      argsForModel.logger.warn('Not such function exists')
      break
  }
}

const Model = {
  invoke: invoke
}

export {
  Model
}
