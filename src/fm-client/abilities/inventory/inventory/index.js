const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const MenuItem = require('../../../components/MenuItem')
const Native = require('../../../components/Native');
const ButtonSymbol = require('../../../components/ButtonSymbol');
const SelectorSymbol = require('../../../components/SelectorSymbol');
const HttpHookLoader = require('../../../components/HttpHookLoader');

const INDEX_BUTTON = 2
const MENU_ITEM = new MenuItem(10, 1, 1)

/*
 * /在庫・棚卸:在庫/在庫照会/
 */
module.exports = class Inventory extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  enable() {
    debug.log('Inventory.enable')
    return false
  }

  async search(options) {
    try {
      await super.clickOnMenu(MENU_ITEM, INDEX_BUTTON).catch(error => {
        throw error
      })

      const page = super.page
      await page.evaluate(storeCodes => {
        Array.from(document.querySelectorAll("#dest\\:dest\\:SELECT span"))
          .filter(x => storeCodes.includes(x.value))
          .map(x => x.setAttribute("selected", "selected"))
      }, options.storeCodes || [])

      await page.evaluate(Native.performClick(), ButtonSymbol.SEARCH)
      await super.waitUntilLoadingIsOver()

      await page.evaluate(Native.performClick(), ButtonSymbol.XLSX)
      await super.waitUntilLoadingIsOver()

      // ファイルをダウンロード
      const client = new HttpHookLoader(page, '/JMODE_ASP/SlipList$', options)
      await client.enable()
      await page.click(SelectorSymbol.EXCEL_DOWNLOAD_LINK);

      return Promise.resolve(true)
    } catch(e) {
      return {
        isSuccess: false,
        statusText: e.message//'原因不明のエラー',
      }
    }
  }
}