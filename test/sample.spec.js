const { expect } = require('chai');
const fmww = require('../');

describe('sample test', function () {
  it('should work', function () {
    expect(true).to.be.true;
  });
  it('echoTest', function () {
    fmww.echoTest();
    expect(true).to.be.true;
  });
});