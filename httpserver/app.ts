import Koa from 'koa'
import { applyMiddleware } from './middleware'
const app = new Koa()

// "database"

applyMiddleware(app)

// listen

export {
  app
}
