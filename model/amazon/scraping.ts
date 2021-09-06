import path from 'path/posix';
import puppeteer from 'puppeteer'

export {
    search,
}
async function search(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.amazon.co.jp/')
    
    await page.setViewport({ width: 1219, height: 757 })
    
    await page.waitForSelector('#twotabsearchtextbox')
    await page.click('#twotabsearchtextbox')
    
    await browser.close()
}


