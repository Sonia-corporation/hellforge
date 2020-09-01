import { MessageManagerService } from "./message-manager.service";

describe(`MessageManagerService`, (): void => {
  let messageManagerService: MessageManagerService;

  describe(`getInstance()`, (): void => {
    it(`should instanciate MessageManagerService`, (): void => {
      expect.assertions(1);

      messageManagerService = MessageManagerService.getInstance();

      expect(messageManagerService).toStrictEqual(
        expect.any(MessageManagerService)
      );
    });
  });
});
