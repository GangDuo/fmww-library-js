const AbstractSinglePage = require('../../components/AbstractSinglePage')
const debug = require('../../../diagnostics/debug')
const MenuItem = require('../../components/MenuItem')
const Native = require('../../components/Native');
const ButtonSymbol = require('../../components/ButtonSymbol');
const SelectorSymbol = require('../../components/SelectorSymbol');
const HttpHookLoader = require('../../components/HttpHookLoader');

const SEARCH_BUTTON = 2
const MENU_ITEM = new MenuItem(11, 1, 3)

/*
 * /移動:移動/移動エクスポート/ 
 */
module.exports = class MovementExport extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  async enable() {
    debug.log('MovementExport.enable')
  }

  async search(options) {
    debug.log('MovementExport.search')
    return [{
      uuid: 1,
      branchId: 1,
      movedAt: '2019-01-01',
      shipFrom: {code: '002', name: 'Osaka'},
      shipTo: {
        code: '001',
        name: 'Tokyo',
        postalCode: '000-0000',
        prefectures: '',
        address1: '',
        address2: '',
        tel: ''
      },
      goods: [{
        code: '',
        name: '',
        color: {code: '', name: ''},
        size: {code: '', name: ''},
        jan: '',
        price: 0,
        cost: 0,
        qty: 0
      }]
    }]
  }

  create() {
    debug.log('MovementExport.create')
    return true
  }

  update() {
    debug.log('MovementExport.update')
    return true
  }

  delete() {
    debug.log('MovementExport.delete')
    return true
  }

  async export(options) {
    debug.log('MovementExport.export')
    await super.clickOnMenu(MENU_ITEM, SEARCH_BUTTON)
    const result = await this.exportMovement_(options).catch(e => {console.log(e);return false;})
    return result
  }

  async exportMovement_(options) {
    const page = super.page
    const senders = options.senders || []
    const receivers = options.receivers || []
    const multipleSelector = () => {
      return (id, xs) => document.getElementById(id).value = xs.join('\t')
    }
    const setValue = () => {
      return (el, v) => el.value = v
    }

    if(options.between) {
      const { from, to } = options.between;
      await page.$eval('#moving_date_from', setValue(), from)
      await page.$eval('#moving_date_to', setValue(), to)
    }
    await page.evaluate(multipleSelector(), 'destFrom:dest', senders)
    await page.evaluate(multipleSelector(), 'destTo:dest', receivers)
    await page.evaluate(Native.performClick(), ButtonSymbol.CSV)
    await super.waitUntilLoadingIsOver()
  
    // ダウンロード処理
    const client = new HttpHookLoader(
      page,
      '/JMODE_ASP/faces/contents/F065_MOVE_EXPORT/F065_SELECT.jsp$',
      options)
    await client.enable()
    await page.click(SelectorSymbol.EXCEL_DOWNLOAD_LINK);

    return Promise.resolve(true)
  }
}