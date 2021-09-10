import winston from 'winston'

/**
 * modelへの引数を表す。
 */
class ArgsForModel {
  modelName: string
  funcName: string
  logger: winston.Logger

  constructor (modelName: string, funcName: string, logger: winston.Logger) {
    this.modelName = modelName
    this.funcName = funcName
    this.logger = logger
  }
}

export {
  ArgsForModel
}
