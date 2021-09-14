import { Handler } from '../handler'
import Router from '@koa/router'

const nologin = new Router()

nologin.get('/', Handler.list)
  .get('/post/new', Handler.add)
  .get('/post/:id', Handler.show)
  .post('/post', Handler.create)

export {
  nologin
}
