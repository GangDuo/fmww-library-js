const fmww = require('../../core/fmwwService')
const AbstractSinglePage = require('../../components/AbstractSinglePage')
const debug = require('../../../diagnostics/debug')
const MenuItem = require('../../components/MenuItem')
const Native = require('../../components/Native');
const ButtonSymbol = require('../../components/ButtonSymbol');
const {writeFileAsync} = require('../../components/Helpers');

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

  async create() {
    debug.log('User.create')
    await super.clickOnMenu(MENU_ITEM, CREATE_BUTTON)
    return true
  }

  update(options) {
    debug.log('User.update')
  }

  delete() {
    debug.log('User.delete')
  }
}