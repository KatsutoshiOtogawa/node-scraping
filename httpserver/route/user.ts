import { Handler } from '../handler'
import Router from '@koa/router'

const user = new Router({
  prefix: '/user'
})

user.get('/', Handler.list)
  .get('/post/new', Handler.add)
  .get('/post/:id', Handler.show)
  .post('/post', Handler.create)

export {
  user
}
