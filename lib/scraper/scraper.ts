
class Scraper {
  topPage: string
  searchBox: string
  searchButton: string
  width: number
  height: number
  screenshotDir: string
  args: string[]
  constructor (topPage: string, searchBox: string, searchButton: string, width: number, height: number) {
    this.topPage = topPage
    this.searchBox = searchBox
    this.searchButton = searchButton
    this.width = width
    this.height = height
    this.screenshotDir = process.env.SCREENSHOT_DIR ?? 'screenshot'
    // docker,vagrantなどの仮想環境なら下記の設定になる。
    if (process.env.VIRTUAL_ENV) {
      this.args = [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    } else {
      this.args = []
    }
  }
}

export {
  Scraper
}
