const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const MenuItem = require('../../../components/MenuItem')
const Native = require('../../../components/Native');
const ButtonSymbol = require('../../../components/ButtonSymbol');
const https = require("https");
const fs = require('fs');

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

  async search() {
    try {
      await super.clickOnMenu(MENU_ITEM, INDEX_BUTTON).catch(error => {
        throw error
      })
      return Promise.resolve(true)
    } catch(e) {
      return {
        isSuccess: false,
        statusText: e.message//'原因不明のエラー',
      }
    }
  }
}