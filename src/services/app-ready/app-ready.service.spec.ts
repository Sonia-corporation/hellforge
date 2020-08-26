import { AppReadyService } from "./app-ready.service";

describe(`AppReadyServivce`, () => {
  let appReady: AppReadyService;

  describe(`getInstance()`, () => {
    it(`should instanciate AppReadyService`, () => {
      expect.assertions(1);

      appReady = AppReadyService.getInstance();

      expect(appReady).toStrictEqual(expect.any(AppReadyService));
    });
  });
});
