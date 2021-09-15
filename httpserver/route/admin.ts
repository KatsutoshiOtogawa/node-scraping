import { Handler } from '../handler'
import { AdminHandler } from '../handler/admin'
import Router from '@koa/router'
import { sessionCheckMiddlewareForAdmin } from '../middleware/session'

const admin = new Router({
  prefix: '/admin'
})

// admin.get('/', sessionCheckMiddleware, Handler.list)
//   .get('/post/new', sessionCheckMiddleware, Handler.add)
//   .get('/post/:id', sessionCheckMiddleware, Handler.show)
//   .post('/post', sessionCheckMiddleware, Handler.create)
//   .get('/logout', Handler.getLogout)

admin.get('/', sessionCheckMiddlewareForAdmin, Handler.list)
  .get('/post/new', sessionCheckMiddlewareForAdmin, Handler.add)
  .get('/post/:id', sessionCheckMiddlewareForAdmin, Handler.show)
  .post('/post', sessionCheckMiddlewareForAdmin, Handler.create)
  .get('/logout', AdminHandler.Login.getLogout)

if (process.env.NODE_ENV !== 'production') {
  console.log(admin.stack.map(i => i.path))
}

export {
  admin
}
