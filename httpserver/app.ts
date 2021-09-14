import { render } from '../lib/render'
import logger from 'koa-logger'
import koaBody from 'koa-body'
import Koa from 'koa'
const router = require('@koa/router')()

const app = new Koa()
// const app = module.exports = new Koa()

// "database"

const posts:any[] = []

// middleware

app.use(logger())

app.use(render)

app.use(koaBody())

// route definitions

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create)

app.use(router.routes())

/**
 * Post listing.
 */

async function list (ctx: Koa.Context) {
  await ctx.render('list', { posts: posts })
}

/**
 * Show creation form.
 */

async function add (ctx: Koa.Context) {
  await ctx.render('new')
}

/**
 * Show post :id.
 */

async function show (ctx: Koa.Context) {
  const id = ctx.params.id
  const post = posts[id]
  if (!post) ctx.throw(404, 'invalid post id')
  await ctx.render('show', { post: post })
}

/**
 * Create a post.
 */

async function create (ctx: Koa.Context) {
  const post = ctx.request.body
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
  ctx.redirect('/')
}

// listen

// if (!module.parent) app.listen(3000)

export {
  app
}
