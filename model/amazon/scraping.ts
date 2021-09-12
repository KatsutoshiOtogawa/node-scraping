import path from 'path'
import puppeteer from 'puppeteer'
import winston from 'winston'
import { Scraper } from '../../lib/scraper'

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

  await browser.close()
}

const Scraping = {
  search: search
}
export {
  Scraping
}
