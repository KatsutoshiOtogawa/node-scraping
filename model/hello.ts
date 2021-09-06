import path from 'path/posix';
import puppeteer from 'puppeteer'

export {
    aaa,
}

async function aaa(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 環境変数screenshot_dirが定義されていたら、それを使う。それ以外はフォルダ配下のディレクトリを使う。
    let screenshot_dir = process.env.SCREENSHOT_DIR ?? 'screenshot'

    await page.goto('https://example.com');
    await page.screenshot({ path: path.join(screenshot_dir,'example.png')  });

    await browser.close();
}