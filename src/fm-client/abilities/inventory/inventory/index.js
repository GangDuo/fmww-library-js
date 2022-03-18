const debug = require('../../../../diagnostics/debug')
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const MenuItem = require('../../../components/MenuItem')
const Native = require('../../../components/Native');
const ButtonSymbol = require('../../../components/ButtonSymbol');
const RequestHijacking = require('../../../components/RequestHijacking');

const https = require("https");
const fs = require('fs');
const path = require('path');

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

  async search(options) {
    try {
      await super.clickOnMenu(MENU_ITEM, INDEX_BUTTON).catch(error => {
        throw error
      })

      const page = super.page
      await page.evaluate(storeCodes => {
        Array.from(document.querySelectorAll("#dest\\:dest\\:SELECT span"))
          .filter(x => storeCodes.includes(x.value))
          .map(x => x.setAttribute("selected", "selected"))
      }, options.storeCodes || [])

      await page.evaluate(Native.performClick(), ButtonSymbol.SEARCH)
      await super.waitUntilLoadingIsOver()

      await page.evaluate(Native.performClick(), ButtonSymbol.XLSX)
      await super.waitUntilLoadingIsOver()

      // ファイルをダウンロード
      const rh = new RequestHijacking(page)
      await rh.intercept('/JMODE_ASP/SlipList$',
        Inventory.sendRequest_,
        options
      )
      await page.click('.excelDLDiv input[name=smt]');

      return Promise.resolve(true)
    } catch(e) {
      return {
        isSuccess: false,
        statusText: e.message//'原因不明のエラー',
      }
    }
  }

  static async sendRequest_(request, cookies, userData) {
    const options = {
      encoding: null,
      method: request._method,
      headers: request._headers,
      resolveWithFullResponse: true,
    }
    options.headers.Cookie = cookies.map(cookie => cookie.name + '=' + cookie.value).join(';');
  
    return new Promise((resolve, reject) => {
      const req = https.request(request._url, options, (response) => {
        if(response.statusCode !== 200) {
          reject()
          return
        }
        
        const machedArray = RegExp('filename=(.*)', 'g').exec(response.headers['content-disposition'])
        const filepath = path.join(userData.directoryToSaveFile || '', machedArray[1])

        const stream = fs.createWriteStream(filepath, { encoding: null });
        response.on('data', (chunk) => stream.write(chunk));
        response.on('end', () => {
          stream.end();
          request.abort()
          resolve()
        });
      });
      
      req.on('error', (e) => reject(e));
      req.write(request._postData);
      req.end();
    });
  }
}