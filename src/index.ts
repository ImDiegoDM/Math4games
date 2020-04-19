import Matrix3x3 from "./lib/math/Matrix3x3";
import Vector3 from "./lib/math/Vector3";

let m = new Matrix3x3()

m.SetRows(
  new Vector3(3,0,2),
  new Vector3(2,0,-2),
  new Vector3(0,1,1),
)

m.Print()
console.log("---------adjoint---------")
const adj = m.Adjoint()
adj.Print()

console.log("---------inverse---------")
const inv = m.Inverse()
inv.Print()

console.log("------Ae-1 * A = I-------")
const r = inv.Multiply(m)
r.Print()