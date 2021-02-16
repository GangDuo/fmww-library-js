const FmClient = require('../../../../src/fm-client/FmClient');
const DailySalesReport = require('../../../../src/fm-client/abilities/for-shop/work/DailySalesReport');

const user = {
  FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
  FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
  FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
  FMWW_PASSWORD          : process.env.FMWW_PASSWORD
}

describe.only('DailySalesReport', function () {
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn(user)
      .createAbility(DailySalesReport)
    expect(ability).to.be.an.instanceof(DailySalesReport);
  }) 
  
  after(async function() {
    await c.quit()
  })

  it('search', async function () {
    const response = await c.search()
    expect(response).to.have.lengthOf(0)
  });
})