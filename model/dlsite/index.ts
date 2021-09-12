import { Scraping } from './scraping'
import { ArgsForModel } from '../../lib/config'

/**
 * 各関数へのエントリーポイントです。
 * @param argsForModel argsModel
 */
function invoke (argsForModel: ArgsForModel) {
  switch (argsForModel.funcName) {
    case 'search':
      Scraping.search('abc', argsForModel.logger)
      break
    default:
      // const err = Error('Not such function exists')
      argsForModel.logger.warn('Not such function exists')
      break
  }
}

const DLSite = {
  invoke: invoke,
  ...Scraping
}

export {
  DLSite
}
