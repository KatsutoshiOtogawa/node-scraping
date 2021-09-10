import puppeteer from 'puppeteer'
import winston from 'winston'

/**
 * 検索窓から指定の言葉を検索します。
 * @param searchWord 検索に使う文字列です。
 * @param logger winstonのloggerを渡してください。これを使ってログを吐きます。
 */
async function search (searchWord: string, logger: winston.Logger) {
  const browser = await puppeteer.launch({
    // docker 内では下の様にする。
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage()
  await page.goto('https://www.amazon.co.jp/')

  await page.setViewport({ width: 1219, height: 757 })

  await page.waitForSelector('#twotabsearchtextbox')
  await page.click('#twotabsearchtextbox')

  // await navigationPromise

  await browser.close()
}

const Scraping = {
  search: search
}
export {
  Scraping
}
