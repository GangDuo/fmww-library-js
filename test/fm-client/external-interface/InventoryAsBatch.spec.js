const {FmClient, InventoryAsBatch} = require('../../../');
const {promisify} = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

describe('InventoryAsBatch', function () {
  const filename = 'FMWW棚卸.csv'
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn()
      .createAbility(InventoryAsBatch)
    expect(ability).to.be.an.instanceof(InventoryAsBatch);
  }) 

  after(async function() {
    await c.quit()
    await unlinkAsync(filename);
  })

  it('should increase inventory', async function () {
    await writeFileAsync(filename, '001991231,0000001002119,2,2099-12-31,9900,001,4')
	  const response = await c.create({
			filePath: filename
    })
    expect(response.statusText).to.match(/^インポートに成功しました。.*/);
		expect(response.isSuccess).be.true
  });

  it('Unregistered products.', async function () {
    await writeFileAsync(filename, '001991231,1002119,2,2099-12-31,9900,001,4')
	  const response = await c.create({
			filePath: filename
		})
    expect(response.statusText).to.match(/^[\d]+行目：未登録商品があります。.*/);
		expect(response.isSuccess).be.false
  });
})