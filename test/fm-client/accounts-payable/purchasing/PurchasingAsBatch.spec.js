const {FmClient, PurchasingAsBatch} = require('../../../../');

describe('PurchasingAsBatch', function () {
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
  })

  it.only('should import csv file.', async function () {
    const response = await c.create()
		expect(response).be.true
  });
})