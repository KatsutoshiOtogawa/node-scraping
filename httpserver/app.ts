import { render } from '../lib/render'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import Koa from 'koa'
import { Routes } from './route'
import { applySessionSetting } from './middleware'

const app = new Koa()

// "database"

// apply middleware
app.use(logger())

app.use(render)

app.use(koaBody())

// sessionの設定読み込み
applySessionSetting(app)

app.use(Routes.user.routes())
app.use(Routes.admin.routes())
app.use(Routes.nologin.routes())
// listen

export {
  app
}
