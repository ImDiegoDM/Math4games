import { Quaternion } from "./Quaternion";
import Vector3 from "./Vector3";

test("should multyply quaternions correctly",()=>{
  const tests = [
    Quaternion.CreateFromAxisAngle(new Vector3(1,0,0),Math.PI/2),
    Quaternion.CreateFromAxisAngle(new Vector3(0,1,0),Math.PI/4),
    Quaternion.CreateFromAxisAngle(new Vector3(0,0,1),Math.PI),
    Quaternion.CreateFromAxisAngle(new Vector3(1,1,1),Math.PI*2),
  ]

  for (const t of tests) {
    const identity = Quaternion.identity
    const q = t
  
    const mQuat = q.Multiply(identity)
  
    expect(mQuat.GetX()).toBe(q.GetX())
    expect(mQuat.GetY()).toBe(q.GetY())
    expect(mQuat.GetZ()).toBe(q.GetZ())
    expect(mQuat.GetW()).toBe(q.GetW())
  }

});