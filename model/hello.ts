import puppeteer from 'puppeteer'

export {
    aaa
}

async function aaa(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
}