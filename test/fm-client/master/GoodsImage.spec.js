const fs = require('fs');

const FmClient = require('../../../src/fm-client/FmClient');
const GoodsImage = require('../../../src/fm-client/abilities/master/goods-image/');

const user = {
  FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
  FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
  FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
  FMWW_PASSWORD          : process.env.FMWW_PASSWORD
}

describe('GoodsImage', function () {
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn(user)
      .createAbility(GoodsImage)
    expect(ability).to.be.an.instanceof(GoodsImage);
  }) 
  
  after(async function() {
    await c.quit()
  })

  it('search', function () {
    c.search()
    expect(true).to.be.true;
  });

  it('update', function () {
    c.update()
    expect(true).to.be.true;
  });

  it('delete', function () {
    c.delete()
    expect(true).to.be.true;
  });

  it('export', async function () {
    const xs = ['00015345', '00081643', '00081637']
    for (const x of xs) {
      const path = `${x}.jpg`
      try {
        if(fs.existsSync(path)) {
          await fs.promises.unlink(path)
        }
      } catch (error) {
        throw error
      }

      await c.export({
        baseURL: process.env.FMWW_SIGN_IN_URL,
        modelNumber: x
      })
      expect(fs.existsSync(path)).to.be.true;
    }
  });
})