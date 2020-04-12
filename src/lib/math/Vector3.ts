import { IvSqrt, IvInverseSqrt } from "./IvMath";
import * as _ from "lodash";

class Vector3 {
  private static _zero = new Vector3(0,0,0)
  public static get zero():Vector3{
    return _.cloneDeep(this._zero)
  }

  private x:number;
  private y:number;
  private z:number;

  constructor(x?:number,y?:number,z?:number){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  public GetX():number {
    return this.x
  }
  public GetY():number {
    return this.y
  }
  public GetZ():number {
    return this.z
  }

  public Set(value:Vector3):Vector3{
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;

    return this
  }

  public SetX(value:number):Vector3 {
    this.x = value
    return this
  }
  public SetY(value:number):Vector3 {
    this.y = value
    return this
  }
  public SetZ(value:number):Vector3 {
    this.z = value
    return this
  }

  public Add(value:Vector3):Vector3 {
    this.x += value.x;
    this.y += value.y;
    this.z += value.z;

    return this
  }

  public Subtract(value:Vector3):Vector3 {
    this.x -= value.x;
    this.y -= value.y;
    this.z -= value.z;

    return this
  }

  public Multiply(value:number):Vector3 {
    this.x *= value;
    this.y *= value;
    this.z *= value;

    return this
  }

  public Divide(value:number):Vector3 {
    this.x /= value;
    this.y /= value;
    this.z /= value;

    return this
  }

  public Length():number {
    return IvSqrt(this.LengthSquared())
  }

  public LengthSquared():number{
    return this.x*this.x + this.y*this.y + this.z*this.z
  }

  public Normalize():Vector3 {
    const lengthsqrd = this.LengthSquared()
    if(lengthsqrd === 0){
      this.Set(Vector3.zero)
      return this
    }

    const recip = IvInverseSqrt(lengthsqrd)
    this.Multiply(recip)

    return this
  }
}

export default Vector3