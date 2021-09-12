import path from 'path'
import puppeteer from 'puppeteer'
import winston from 'winston'
import { Scraper } from '../../lib/scraper'

// #search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(7)
// #search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(8)

const scraper = new Scraper(
  'https://www.amazon.co.jp/',
  '#twotabsearchtextbox',
  '#nav-search-submit-button',
  1219,
  757
)
/**
 * 検索窓から指定の言葉を検索します。
 * @param searchWord 検索に使う文字列です。
 * @param logger winstonのloggerを渡してください。これを使ってログを吐きます。
 */
async function search (searchWord: string, logger: winston.Logger) {
  const browser = await puppeteer.launch({
    // docker 内では下の様にする。
    args: scraper.args
  })
  const page = await browser.newPage()
  await page.goto(scraper.topPage)
  await page.setViewport({ width: scraper.width, height: scraper.height })

  await page.waitForSelector(scraper.searchBox)
  await page.type(scraper.searchBox, searchWord)
  await page.waitForSelector(scraper.searchButton)
  await page.click(scraper.searchButton)
  await page.waitForTimeout(5000)

  await page.screenshot({ path: path.join(scraper.screenshotDir, 'example.png'), fullPage: true })

  const target = await page.$$('#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row')

  await target.forEach(
    (value: puppeteer.ElementHandle<Element>, index: number, array: puppeteer.ElementHandle<Element>[]) => {
      logger.info(value)
    })

  await browser.close()
}

const Scraping = {
  search: search
}
export {
  Scraping
}
