const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const MenuItem = require('../../../components/MenuItem')
const Native = require('../../../components/Native');
const ButtonSymbol = require('../../../components/ButtonSymbol');
const RequestHijacking = require('../../../components/RequestHijacking');
const FileDownloader = require('../../../components/FileDownloader');

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

      const page = super.page
      await page.evaluate(span => {
        document.getElementById('output').value = '1';

        [
          {id: 'bill_effective_date_start', value: span.begin},
          {id: 'bill_effective_date_end', value: span.end}
        ].forEach(x => {
          if(x.value) {
            document.getElementById(x.id).value = x.value;
          }  
        })
      }, options.span || {})

      await page.evaluate(Native.performClick(), ButtonSymbol.XLSX)
      await super.waitUntilLoadingIsOver()

      // ファイルをダウンロード
      const rh = new RequestHijacking(page)
      await rh.intercept('/JMODE_ASP/faces/contents/X152_160_SUP_BILL_EXPORT/X152_SELECT.jsp$',
        FileDownloader.request,
        options
      )
      await page.click('.excelDLDiv input[name=smt]');
    } catch(e) {
      return {
        isSuccess: false,
        statusText: e.message//'原因不明のエラー',
      }
    }

    return Promise.resolve(true)
  }
}