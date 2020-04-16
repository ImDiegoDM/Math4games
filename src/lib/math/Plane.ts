import Vector3 from "./Vector3";
import { IvIsZero, IvInverseSqrt } from "./IvMath";

class Plane{
  private mNormal: Vector3
  private mOffset: number

  constructor(normal:Vector3, offset:number){
    this.mNormal = normal
    this.mOffset = offset
  }

  public static CreateFromGeneralized(a:number,b:number,c:number,d:number){
    const lensq = a*a + b*b + c*c;

    if(IvIsZero(lensq)){
      return new Plane(Vector3.xAxis,0)
    }

    const recip = IvInverseSqrt(lensq)
    const mNormal = new Vector3(a*recip,b*recip,c*recip)
    const mOffset = d*recip

    return new Plane(mNormal,mOffset)
  }
}

export default Plane