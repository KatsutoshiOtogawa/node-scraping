import { render } from '../../lib/render'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import Koa from 'koa'
import { Routes } from '../route'

/**
 *Koaのインスタンスに対してmiddlewareを適用する
 * @param app Koaのインスタンス
 */
function applyMiddleware (app: Koa<Koa.DefaultState, Koa.DefaultContext>): void {
  app.use(logger())

  app.use(render)

  app.use(koaBody())

  app.use(Routes.user.routes())
  app.use(Routes.admin.routes())
  app.use(Routes.nologin.routes())
}

export {
  applyMiddleware
}
