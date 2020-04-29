const AbstractSinglePage = require('../../components/AbstractSinglePage')
const debug = require('../../../diagnostics/debug')
const MenuItem = require('../../components/MenuItem')
const Native = require('../../components/Native');
const ButtonSymbol = require('../../components/ButtonSymbol');

const CREATE_BUTTON = 2
const SEARCH_BUTTON = 3
const EDIT_BUTTON = 4
const MENU_ITEM = new MenuItem(12, 2, 2)

/*
 * /マスター:各種マスター/担当者ﾏｽﾀ/
 */
module.exports = class User extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  enable() {
    debug.log('User.enable')
    return true
  }

  search(options) {
    debug.log('User.search')
  }

  async create(options) {
    debug.log('User.create')
    const initialValue = {menu: "00"}
    const page = super.page
    await super.clickOnMenu(MENU_ITEM, CREATE_BUTTON)
    await page.evaluate(x => {
      document.getElementById('personCd').value = x.code;
      document.getElementById('password').value = x.password;
      document.getElementById('rePassword').value = x.password;
      document.getElementById('pGroup_cd').value = x.group;
      document.getElementById('menu').value = x.menu;
      document.getElementById('person_nm').value = x.name;
  
      if(!x.supplierCodes || !Array.isArray(x.supplierCodes)) return
      // 仕入先を複数選択
      document.getElementById('sup_cd').value = x.supplierCodes.join('\t')
    }, Object.assign(initialValue, options))
    await page.evaluate(Native.disableConfirmationDialog)
    await page.evaluate(Native.performClick(), ButtonSymbol.REGISTER)
    await super.waitUntilLoadingIsOver()
    await super.backToMainMenu()

    return true
  }

  update(options) {
    debug.log('User.update')
  }

  delete() {
    debug.log('User.delete')
  }
}