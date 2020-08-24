import { MessageManager } from "./message-manager"

describe('MessageManager', () => {
  let messageManager: MessageManager

  describe('getInstance()', () => {
    it('should instanciate messageManager', () => {
      expect.assertions(1)

      messageManager = MessageManager.getInstance()

      expect(messageManager).toStrictEqual(expect.any(MessageManager))
    })
  })
})
