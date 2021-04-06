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

  export(options) {
    debug.log('GoodsImage.export')
  }
}