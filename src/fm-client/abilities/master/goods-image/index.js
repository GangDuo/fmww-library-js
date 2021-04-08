const fs = require('fs').promises;
const AbstractSinglePage = require('../../../components/AbstractSinglePage')
const debug = require('../../../../diagnostics/debug')

/*
 * /マスター:商品マスター/商品画像/
 */
module.exports = class GoodsImage extends AbstractSinglePage {
  constructor(page) {
    super(page)
  }

  async enable() {
    debug.log('GoodsImage.enable')
    return true
  }

  search(options) {
    debug.log('GoodsImage.search')
  }

  update(options) {
    debug.log('GoodsImage.update')
  }

  delete() {
    debug.log('GoodsImage.delete')
  }

  async export({ baseURL, modelNumber, ...options }) {
    debug.log('GoodsImage.export')

    const page = super.page
    const destination = [(options.destination || '').replace(/\/+$/, '')].map(x => x.length > 0 ? x.concat('/') : x).pop()
    if(destination.length > 0) {
      await fs.mkdir(destination, {
        recursive: true
      })
      .catch(e => console.error(e))
    }
    const imageURL = new URL(`/JMODE_ASP/faces/contents/imageServlet?dir=system&id=0&style=${modelNumber}`, baseURL);

    try {
      const viewSource = await page.goto(imageURL.toString());
      const content = await viewSource.buffer()

      await fs.writeFile(`${destination}${modelNumber}.jpg`, content)
    } catch (error) {
      throw error
    }
  }
}