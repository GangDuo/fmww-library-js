const {FmClient, PurchasingAsBatch} = require('../../../../');
const {promisify} = require('util');
const fs = require('fs');
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

describe('PurchasingAsBatch', function () {
  const filename = 'FMWW仕入.csv'
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn()
      .createAbility(PurchasingAsBatch)
    expect(ability).to.be.an.instanceof(PurchasingAsBatch);
  }) 

  after(async function() {
    await c.quit()
    await unlinkAsync(filename);
  })

  it('should import csv file.', async function () {
  });

  it('should fail to import csv file.', async function () {
    await writeFileAsync(filename, ',,9999A,2099-12-31,41,1,001,10,,9900,45801703733,1,,,,9998')
    const response = await c.create({
			filePath: filename
    })
    expect(response.statusText).to.match(/^不適当なSKUがあります。.*/);
		expect(response.isSuccess).be.false
  });
})