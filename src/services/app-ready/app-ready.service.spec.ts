import { AppReadyServivce } from "./app-ready.service"

describe('AppReadyServivce', () => {
  let appReady: AppReadyServivce

  describe('getInstance()', () => {
    it('should instanciate AppReadyService', () => {
      expect.assertions(1)

      appReady = AppReadyServivce.getInstance()

      expect(appReady).toStrictEqual(expect.any(AppReadyServivce))
    })
  })
})
