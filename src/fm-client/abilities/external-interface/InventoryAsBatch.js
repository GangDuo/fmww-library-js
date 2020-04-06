const fs = require('fs');
const AbstractSinglePage = require('../../components/AbstractSinglePage')
const debug = require('../../../diagnostics/debug')
const Native = require('../../components/Native');
const ButtonSymbol = require('../../components/ButtonSymbol');
const MenuItem = require('../../components/MenuItem')

const CREATE_BUTTON = 2
const MENU_ITEM = new MenuItem(14, 1, 5)

/*
 * /外部インターフェース:対HT/棚卸ｲﾝﾎﾟｰﾄ/ 
 */
module.exports = class InventoryAsBatch extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  async enable() {
    debug.log('Inventory.enable')
    await super.clickOnMenu(MENU_ITEM, CREATE_BUTTON)
    return true
  }

  async create(options) {
    debug.log('Inventory.create')
    const page = super.page
    const filePath = options.filePath
    if(!fs.existsSync(filePath)) return false

    const frame = await page.frames().find(f => f.name() === 'file:frame')
    const inputUploadHandle = await frame.$('input[type=file]')
    await inputUploadHandle.uploadFile(filePath)
    await frame.$eval('form[id=form]', e => e.submit())
    // アップロード完了まで待つ
    const SELECTOR_FOR_FILE_SIZE = '#succ .fileSize'
    await frame.waitForSelector(SELECTOR_FOR_FILE_SIZE)
    const fileSize = await frame.$eval(SELECTOR_FOR_FILE_SIZE, e => e.textContent)

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