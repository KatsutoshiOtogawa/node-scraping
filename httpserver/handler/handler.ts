import Koa from 'koa'
import { passwordAuthentication } from '../middleware/auth'

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

async function getLogin (ctx: Koa.Context) {
  await ctx.render('login', { post: posts })
}

async function postLogin (ctx: Koa.Context, next: Koa.Next) {
  const email = ctx.request.body?.email ?? ''
  const password = ctx.request.body?.password ?? ''

  console.log(email)
  console.log(password)
  const user = await passwordAuthentication(email, password)

  console.log(user)
  if (user) {
    console.log('user get')
    if (ctx.session) {
      console.log('login session')
      ctx.session.isAdmin = user
      ctx.redirect('/admin/')
    }
  }
  // メールアドレスかパスワードが間違っています。
  // next()
  // ここでログイン認証走る。
  await ctx.render('login', { post: posts })
}
// app.get('/login', (req, res) => {
//     const errorMessage = req.flash('error').join('<br>');
//     res.render('login/form', {
//       errorMessage: errorMessage
//     });
//   });

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
  create: create,
  getLogin: getLogin,
  postLogin: postLogin
}

export {
  Handler
}
