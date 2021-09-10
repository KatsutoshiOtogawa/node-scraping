
// model配下の各処理へのエントリーポイントです。
import { Amazon } from './amazon'
import { ArgsForModel } from '../lib/config'

/**
 * 各モデルへのエントリーポイントです。
 * @param argsForModel configのargsModelです。
 */
function invoke (argsForModel: ArgsForModel) {
  // switchで角。
  if (argsForModel.modelName === 'Amazon') {
    Amazon.invoke(argsForModel)
  }
}

const Model = {
  invoke: invoke
}

export {
  Model
}
