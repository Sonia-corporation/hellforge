import { MessageManagerService } from "./message-manager.service"

describe('MessageManagerService', () => {
  let MessageManagerService: MessageManagerService

  describe('getInstance()', () => {
    it('should instanciate MessageManagerService', () => {
      expect.assertions(1)

      MessageManagerService = MessageManagerService.getInstance()

      expect(MessageManagerService).toStrictEqual(expect.any(MessageManagerService))
    })
  })
})
