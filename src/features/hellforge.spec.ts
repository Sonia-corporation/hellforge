import { Hellforge } from "./hellforge"

describe('Hellforge', () => {
  let hellforge: Hellforge

  describe('getInstance()', () => {
    it('should instanciate hellforge', () => {
      expect.assertions(1)

      hellforge = Hellforge.getInstance()

      expect(hellforge).toStrictEqual(expect.any(Hellforge))
    })
  })
})
