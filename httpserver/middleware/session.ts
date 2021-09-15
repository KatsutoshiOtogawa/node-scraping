import Koa from 'koa'
import session from 'koa-session'

/**
 * Sessionの設定を行う
 * @param app Koaのインスタンス
 */
function applySessionSetting (app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
  app.keys = [process.env.SESSION_KEY ?? 'some secret hurr']

  let isHttpOnly = false
  let isSecure = false
  // 本番環境だったら
  if (process.env.NODE_ENV === 'production') {
    isHttpOnly = true
    isSecure = true
  }
  const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: isHttpOnly, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
    secure: isSecure /** (boolean) secure cookie */
    // sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */
  }

  app.use(session(CONFIG, app))
  // or if you prefer all default config, just use => app.use(session(app))

  // middlewareにして分ける。
  // app.use(ctx => {
  //   // ignore favicon
  //   if (ctx.path === '/favicon.ico') return

  //   // adminでログインしていたらここに入る。
  //   if (ctx.session?.isAdmin) {
  //     console.log('admin')
  //     // next
  //   } else {
  //     // ログインしてなかったら
  //     ctx.redirect('/login')
  //   }
  //   // let n = ctx.session?.views ?? 0
  //   // ctx.session.views = ++n
  //   // ctx.body = n + ' views'
  // })
}

// function sessionCheck (app: Koa<Koa.DefaultState, Koa.DefaultContext>) {
//   app.use(ctx => {
//     // ignore favicon
//     if (ctx.path === '/favicon.ico') return

//     // adminでログインしていたらここに入る。
//     if (ctx.session?.isAdmin) {
//       console.log('admin')
//       // next
//     } else {
//       // ログインしてなかったら
//       ctx.redirect('/login')
//     }
//     // let n = ctx.session?.views ?? 0
//     // ctx.session.views = ++n
//     // ctx.body = n + ' views'
//   })
// }

async function sessionCheckMiddlewareForAdmin (ctx: Koa.Context, next: Koa.Next) {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return

  // adminでログインしていたらここに入る。
  if (ctx.session?.admin) {
    console.log('admin')
    // next()
  } else {
    // ログインしてなかったら
    ctx.redirect('/login/admin')
  }
  await next()
}

async function sessionCheckMiddlewareForUser (ctx: Koa.Context, next: Koa.Next) {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return

  // adminでログインしていたらここに入る。
  if (ctx.session?.user) {
    console.log('user')
    // next()
  } else {
    // ログインしてなかったら
    ctx.redirect('/login/user')
  }
  await next()
}

export {
  applySessionSetting,
  sessionCheckMiddlewareForAdmin,
  sessionCheckMiddlewareForUser
}
