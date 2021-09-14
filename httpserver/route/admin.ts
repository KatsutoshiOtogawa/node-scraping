import { Handler } from '../handler'
import Router from '@koa/router'

const admin = new Router({
  prefix: '/admin'
})

admin.get('/', Handler.list)
  .get('/post/new', Handler.add)
  .get('/post/:id', Handler.show)
  .post('/post', Handler.create)

export {
  admin
}
