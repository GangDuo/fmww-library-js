const FmClient = require('../../../src/fm-client/FmClient');
const PurchaseHistory = require('../../../src/fm-client/abilities/web-edi/purchase-history');

const user = {
  FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
  FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
  FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
  FMWW_PASSWORD          : process.env.FMWW_PASSWORD
}

describe('purchase-history', function () {
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn(user)
      .createAbility(PurchaseHistory)
    expect(ability).to.be.an.instanceof(PurchaseHistory);
  }) 
  
  after(async function() {
    await c.quit()
  })

  it('download with Excel', async function () {
    const response = await c.search({
      span: {
        begin: '2022年03月01日',
        end: '2022年03月01日'
      }
    })
    expect(response).be.true
  });  
})