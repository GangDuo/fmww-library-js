const FileUploadablePage = require('../../../components/FileUploadablePage');
const MenuItem = require('../../../components/MenuItem')

const CREATE_BUTTON = 2
const MENU_ITEM = new MenuItem(5, 1, 3)

/*
 * /仕入買掛:仕入/仕入インポート/ 
 */
module.exports = class PurchasingAsBatch extends FileUploadablePage {
  constructor(page) {
    super(page)
  }

  async enable() {
    await super.clickOnMenu(MENU_ITEM, CREATE_BUTTON)
    return true
  }
}