import Vector3 from "./Vector3"

test("should add correctly",()=>{
  let a = new Vector3(1,2,3)
  const b = new Vector3(3,4,5)

  a = a.Add(b)

  expect(a.GetX()).toBe(4)
  expect(a.GetY()).toBe(6)
  expect(a.GetZ()).toBe(8)
})

test("should subtract correctly",()=>{
  let a = new Vector3(1,2,3)
  const b = new Vector3(3,4,5)

  a = a.Subtract(b)

  expect(a.GetX()).toBe(-2)
  expect(a.GetY()).toBe(-2)
  expect(a.GetZ()).toBe(-2)
})

test("should multiply correctly",()=>{
  let a = new Vector3(2,3,5)

  a = a.Multiply(2)

  expect(a.GetX()).toBe(4)
  expect(a.GetY()).toBe(6)
  expect(a.GetZ()).toBe(10)
})

test("should divide correctly",()=>{
  let a = new Vector3(6,2,4)

  a = a.Divide(2)

  expect(a.GetX()).toBe(3)
  expect(a.GetY()).toBe(1)
  expect(a.GetZ()).toBe(2)
})

test("should not be able to change zero value",()=>{
  const z = Vector3.zero
  z.SetX(2)
  z.SetY(2)
  z.SetZ(2)

  expect(Vector3.zero.GetX()).toBe(0)
  expect(Vector3.zero.GetY()).toBe(0)
  expect(Vector3.zero.GetZ()).toBe(0)
})

test("should be abble to calculate length correctly",()=>{
  const v = new Vector3(2,2,1)

  expect(v.Length()).toBe(3)
  expect(v.LengthSquared()).toBe(9)
})

test("should normalize correctly",()=>{
  let v = new Vector3(2,2,1)

  v = v.Normalize()

  expect(v.GetX()).toBe(2/3)
  expect(v.GetY()).toBe(2/3)
  expect(v.GetZ()).toBe(1/3)
})