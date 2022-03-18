const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const MenuItem = require('../../../components/MenuItem')

const INDEX_BUTTON = 2
const MENU_ITEM = new MenuItem(15, 1, 4)

/*
 * /WEB-EDI:WEB-EDI/仕入請求出力/
 */
module.exports = class PurchaseHistory extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  enable() {
    debug.log('PurchaseHistory.enable')
    return false
  }

  async search(options) {
    try {
      await super.clickOnMenu(MENU_ITEM, INDEX_BUTTON).catch(error => {
        throw error
      })
    } catch(e) {
      return {
        isSuccess: false,
        statusText: e.message//'原因不明のエラー',
      }
    }

    return Promise.resolve(true)
  }
}