import puppeteer from 'puppeteer'

async function search () {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.amazon.co.jp/')

  await page.setViewport({ width: 1219, height: 757 })

  await page.waitForSelector('#twotabsearchtextbox')
  await page.click('#twotabsearchtextbox')

  // await navigationPromise

  await browser.close()
}

export {
  search
}
