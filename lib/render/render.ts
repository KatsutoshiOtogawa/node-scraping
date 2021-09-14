import views from 'koa-views'
// import path from 'path'

const viewsDir = process.env.VIEWS_DIR ?? ''

// const render = views(path.join(__dirname, '/../../views'), {
const render = views(viewsDir, {
  map: { html: 'swig' }
})

export {
  render
}
