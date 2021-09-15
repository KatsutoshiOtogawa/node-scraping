import Koa from 'koa'
import { passwordAuthentication } from '../../middleware/auth'

const posts:any[] = []

async function getLogin (ctx: Koa.Context) {
  await ctx.render('login', { post: posts })
}

async function getLogout (ctx: Koa.Context) {
  ctx.session = null
  await ctx.render('logout', { post: posts })
}
// AlreadyHasActiveConnectionError: Cannot create a new connection named "default", because connection with such name already exist and it now has an active connection session.

async function postLogin (ctx: Koa.Context, next: Koa.Next) {
  const email = ctx.request.body?.email ?? ''
  const password = ctx.request.body?.password ?? ''

  console.log(email)
  console.log(password)
  const user = await passwordAuthentication(email, password)
    .catch(error => {
    // insernalserver error
      console.log(error)
      ctx.status = 500
    })

  console.log(user)
  if (user) {
    console.log('user get')
    if (ctx.session) {
      console.log('login session')
      ctx.session.admin = user
      ctx.redirect('/user/')
    }
  }
  // メールアドレスかパスワードが間違っています。
  // next()
  await ctx.render('login', { post: posts })
}

// app.get('/login', (req, res) => {
//     const errorMessage = req.flash('error').join('<br>');
//     res.render('login/form', {
//       errorMessage: errorMessage
//     });
//   });

const Login = {
  getLogin: getLogin,
  postLogin: postLogin,
  getLogout: getLogout
}

export {
  Login
}
