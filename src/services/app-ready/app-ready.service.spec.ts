import { AppReadyService } from "./app-ready.service";

describe(`AppReadyService`, (): void => {
  let appReady: AppReadyService;

  describe(`getInstance()`, (): void => {
    it(`should instanciate AppReadyService`, (): void => {
      expect.assertions(1);

      appReady = AppReadyService.getInstance();

      expect(appReady).toStrictEqual(expect.any(AppReadyService));
    });
  });
});
