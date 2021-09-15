import { Handler } from '../handler'
import Router from '@koa/router'

const user = new Router({
  prefix: '/user'
})

user.get('/', Handler.list)
  .get('/post/new', Handler.add)
  .get('/post/:id', Handler.show)
  .post('/post', Handler.create)

if (process.env.NODE_ENV !== 'production') {
  console.log(user.stack.map(i => i.path))
}

export {
  user
}
