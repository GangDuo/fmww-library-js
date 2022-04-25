const ICommand = require("./ICommand");
const IAction = require("./IAction");

module.exports = class ActionCommand extends ICommand {
  constructor(receiver) {
    super()
    this.receiver = receiver
  }

  async execute(context) {
    if(!this.receiver) return

    const hasIAction = this.receiver instanceof IAction
    if(!hasIAction) {
      throw new TypeError
    }
    await this.receiver.action(context)
  }
}