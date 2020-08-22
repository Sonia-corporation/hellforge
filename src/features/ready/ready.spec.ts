import { Ready } from "./ready"

describe('Ready', () => {
  let ready: Ready

  describe('getInstance()', () => {
    it('should instanciate ready', () => {
      expect.assertions(1)

      ready = Ready.getInstance()

      expect(ready).toStrictEqual(expect.any(Ready))
    })
  })
})
