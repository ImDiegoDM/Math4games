import { IvIsZero } from "./IvMath"


test("should calculate the is zero correctly",()=>{
  const x = 1
  const y = 1e-7
  const z = .00000001

  expect(IvIsZero(x)).toBe(false)
  expect(IvIsZero(y)).toBe(true)
  expect(IvIsZero(z)).toBe(true)
})