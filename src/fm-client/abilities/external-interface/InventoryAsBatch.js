const fs = require('fs');

const FileUploadablePage = require('../../components/FileUploadablePage');
const debug = require('../../../diagnostics/debug')
const MenuItem = require('../../components/MenuItem')

const CREATE_BUTTON = 2
const MENU_ITEM = new MenuItem(14, 1, 5)

/*
 * /外部インターフェース:対HT/棚卸ｲﾝﾎﾟｰﾄ/ 
 */
module.exports = class InventoryAsBatch extends FileUploadablePage {
  constructor(page) {
    super(page)
  }

  async enable() {
    debug.log('Inventory.enable')
    await super.clickOnMenu(MENU_ITEM, CREATE_BUTTON)
    return true
  }
}