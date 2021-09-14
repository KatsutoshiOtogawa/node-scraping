import { Handler } from '../handler'
import Router from '@koa/router'
import { sessionCheckMiddleware } from '../middleware/session'

const admin = new Router({
  prefix: '/admin'
})

admin.get('/', sessionCheckMiddleware, Handler.list)
  .get('/post/new', sessionCheckMiddleware, Handler.add)
  .get('/post/:id', sessionCheckMiddleware, Handler.show)
  .post('/post', sessionCheckMiddleware, Handler.create)

export {
  admin
}
