import views from 'koa-views'
import path from 'path'

const render = views(path.join(__dirname, '/../../views'), {
  map: { html: 'swig' }
})

export {
  render
}
