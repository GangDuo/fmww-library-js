const ICommand = require("./ICommand");

module.exports = class HttpHookControl {
  constructor(page) {
    this.page = page;
  }

  async intercept(url) {
    const page = this.page
  
    await page.setRequestInterception(true);
        
    page.on('request', async (request) => {
      const pattern = new RegExp(url, 'g')
      if(!pattern.test(request._url)) {
        request.abort()
        return
      }

      const cookies = await page.cookies();
      await this._onHook({request, cookies})
    });  
  }

  setCommand(cmd) {
    this.cmd = cmd
  }

  async _onHook(context) {
    if(!this.cmd) return;

    const hasICommand = this.cmd instanceof ICommand
    if(!hasICommand) {
      throw new TypeError
    }

    await this.cmd.execute(context)
  }
}