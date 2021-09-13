import dmm from 'dmm.js'

const apiId = process.env.DMM_API_ID ?? ''
const affiliateId = process.env.DMM_AFFILIATE_ID ?? ''

const client = new dmm.Client({
  api_id: apiId,
  affiliate_id: affiliateId
})

const Api = {
  client: client
}
export {
  Api
}
