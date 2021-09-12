import path from 'path'
import puppeteer from 'puppeteer'
import winston from 'winston'

// /html/body/div[5]/div/ul/li[2]/a
// https://www.dlsite.com/
// const topPage = 'https://www.dlsite.com/maniax/'
const topPage = 'https://www.dlsite.com/'
// const searchBox = '//*[@id="twotabsearchtextbox"]'
// const searchButton = '//*[@id="nav-search-submit-button"]'
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
  await page.goto(topPage)
  await page.setViewport({ width: 1219, height: 757 })

  // await page.waitForXPath(searchBox)
  // await page.type(searchBox, searchWord)
  // await page.click(searchButton)
  // await page.waitForSelector('body')
  //  await page.waitForNavigation()
  const screenshotDir = process.env.SCREENSHOT_DIR ?? 'screenshot'

  logger.info('dlsite scraping')
  await page.screenshot({ path: path.join(screenshotDir, 'example.png') })
  // await navigationPromise

  await browser.close()
}

const Scraping = {
  search: search
}
export {
  Scraping
}
