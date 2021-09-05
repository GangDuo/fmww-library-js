const fs = require('fs');

const AbstractSinglePage = require('./AbstractSinglePage')
const Native = require('./Native');
const ButtonSymbol = require('./ButtonSymbol');

module.exports = class FileUploadablePage extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  async create(options) {
    const page = super.page
    const filePath = options.filePath
    if(!fs.existsSync(filePath)) return false

    const fileSize = await super.uploadFile(filePath)

    // 登録開始
    await page.evaluate(Native.performClick(), ButtonSymbol.REGISTER)
    await super.waitUntilLoadingIsOver()
    const message = await page.$eval('#errorMessage', e => [e.innerText, e.textContent])

    await page.$eval('.closeBtn', e => e.click())

    return {
      fileSize: fileSize,
      isSuccess: message[1].startsWith('インポートに成功しました。'),
      statusText: message[0]
    }
  }
}