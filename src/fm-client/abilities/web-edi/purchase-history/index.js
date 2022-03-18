const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')

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
    return Promise.resolve(true)
  }
}