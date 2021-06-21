const { expect } = require('chai');
const FmClient = require('../../../../src/fm-client/FmClient');
const MovementExport = require('../../../../src/fm-client/abilities/movement/MovementExport');
const Between = require('../../../../src/fm-client/components/Between');

describe('FmClient', function () {
  const user = {
    FMWW_ACCESS_KEY_ID     : process.env.FMWW_ACCESS_KEY_ID,
    FMWW_USER_NAME         : process.env.FMWW_USER_NAME,
    FMWW_SECRET_ACCESS_KEY : process.env.FMWW_SECRET_ACCESS_KEY,
    FMWW_PASSWORD          : process.env.FMWW_PASSWORD
  }

  before(async function() {
  }) 
  
  after(async function() {
  }) 

  describe('MovementExport', function () {
    const c = new FmClient()

    before(async function() {
      const ability = await c
        .open(process.env.FMWW_SIGN_IN_URL)
        .signIn(user)
        .createAbility(MovementExport)
      expect(ability).to.be.an.instanceof(MovementExport);  
    }) 
    
    after(async function() {
      await c.quit()
    }) 

    it('search', async function () {
      const res = await c.search()
      expect(res).to.have.lengthOf(1)
    });

    it('create', async function () {
      const response = await c.create()
      expect(response).be.true
    });

    it('update', async function () {
      const response = await c.update()
      expect(response).be.true
    });

    it('delete', async function () {
      const response = await c.delete()
      expect(response).be.true
    });

    it('export', async function () {
      const response = await c.export({
        filename: 'movement.csv',
        between: new Between('2099-12-31', '2099-12-31')
      })
      expect(response).be.true
    });
  });
});