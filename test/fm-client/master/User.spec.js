const FmClient = require('../../../src/fm-client/FmClient');
const User = require('../../../src/fm-client/abilities/master/User');

const user = {
  FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
  FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
  FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
  FMWW_PASSWORD          : process.env.FMWW_PASSWORD
}

describe('User', function () {
  const c = new FmClient()

  before(async function() {
    const ability = await c
      .open(process.env.FMWW_SIGN_IN_URL)
      .signIn(user)
      .createAbility(User)
    expect(ability).to.be.an.instanceof(User);
  }) 
  
  after(async function() {
    await c.quit()
  })

  it('create', async function () {
    const response = await c.create({
      code: "test",
      password: "test",
      group: "111",
      menu: "00",
      name: "test",
      supplierCodes: ["0002", "0004"]
    })
    expect(response).be.true
  });
})