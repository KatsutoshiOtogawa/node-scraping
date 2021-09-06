import path from 'path/posix';
import puppeteer from 'puppeteer'

export {
    aaa,
}

async function aaa(){
    const browser = await puppeteer.launch({
        // docker 内では下の様にする。
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
    const page = await browser.newPage();

    // 環境変数screenshot_dirが定義されていたら、それを使う。それ以外はフォルダ配下のディレクトリを使う。
    const screenshot_dir = process.env.SCREENSHOT_DIR ?? 'screenshot'

    await page.goto('https://example.com'),
    await page.screenshot({ path: path.join(screenshot_dir,'example.png')}),
    await browser.close()

}