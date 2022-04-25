const HttpHookControl = require('./HttpHookControl');
const ActionCommand = require('./ActionCommand');
const RemoteFile = require('./RemoteFile');

module.exports = class HttpHookLoader {
  constructor(page, url, options) {
    this.url = url
    this.options = options

    const remoteFileDownloadCommand = new ActionCommand(new RemoteFile(options))

    this.control = new HttpHookControl(page)
    this.control.setCommand(remoteFileDownloadCommand)
  }

  async enable() {
    await this.control.intercept(this.url)
  }
}