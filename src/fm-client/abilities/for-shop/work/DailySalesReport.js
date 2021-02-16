const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const Native = require('../../../components/Native');
const ButtonSymbol = require('../../../components/ButtonSymbol');
const MenuItem = require('../../../components/MenuItem')
const {sleep} = require('../../../components/Helpers');

const INDEX_BUTTON = 2
const MENU_ITEM = new MenuItem(7, 1, 10)

/*
 * /店舗管理:店舗業務/売上日報/
 */
module.exports = class DailySalesReport extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  enable() {
    debug.log('DailySalesReport.enable')
    return false
  }

  async search(options) {
    await super.clickOnMenu(MENU_ITEM, INDEX_BUTTON)
    // TODO: 日報データ取得
    //await super.backToMainMenu()
    return []
  }
}