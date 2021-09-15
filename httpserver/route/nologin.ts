import { Handler } from '../handler'
import { AdminHandler } from '../handler/admin'
import { UserHandler } from '../handler/user'
import Router from '@koa/router'

const nologin = new Router()

nologin.get('/', Handler.list)
  .get('/post/new', Handler.add)
  .get('/post/:id', Handler.show)
  .post('/post', Handler.create)

// 管理者用ログイン
nologin.get('/login/admin', AdminHandler.Login.getLogin)
  .post('/login/admin', AdminHandler.Login.postLogin)

// ユーザー用ログイン
nologin.get('/login/user', UserHandler.Login.getLogin)
  .post('/login/user', UserHandler.Login.postLogin)

if (process.env.NODE_ENV !== 'production') {
  console.log(nologin.stack.map(i => i.path))
}

export {
  nologin
}
