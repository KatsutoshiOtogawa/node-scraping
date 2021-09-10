import { Scraping } from './scraping'
import { ArgsForModel } from '../../lib/config'

/**
 * 各関数へのエントリーポイントです。
 * @param argsForModel argsModel
 */
function invoke (argsForModel: ArgsForModel) {
  // search引数の実行がsearchだったら実行。
  Scraping.search('abc', argsForModel.logger)
}

const Amazon = {
  invoke: invoke,
  ...Scraping
}

export {
  Amazon
}
