import Koa from 'koa'

const posts:any[] = []

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

const Handler = {
  list: list,
  add: add,
  show: show,
  create: create
}

export {
  Handler
}
