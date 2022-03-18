const FmClient = require('../../../../src/fm-client/FmClient');
const Inventory = require('../../../../src/fm-client/abilities/inventory/inventory');

const user = {
  FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
  FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
  FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
  FMWW_PASSWORD          : process.env.FMWW_PASSWORD
}

describe.only('inventory', function () {
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn(user)
      .createAbility(Inventory)
    expect(ability).to.be.an.instanceof(Inventory);
  }) 
  
  after(async function() {
    await c.quit()
  })

  it('search', async function () {
    this.timeout(180000);
    const response = await c.search({
      storeCodes: ['99999', '9500'],
    })
    expect(response).be.true
  });  
})