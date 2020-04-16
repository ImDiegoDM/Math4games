import { IvSqrt, IvInverseSqrt, IvIsZero } from "./IvMath";
import * as _ from "lodash";

class Vector3 {
  private static _zero = new Vector3(0,0,0)
  public static get zero():Vector3{
    return _.cloneDeep(this._zero)
  }
  private static _xAxis = new Vector3(1,0,0)
  public static get xAxis():Vector3{
    return _.cloneDeep(this._xAxis)
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

  public Set(value:Vector3){
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;
  }

  public SetX(value:number) {
    this.x = value
  }
  public SetY(value:number) {
    this.y = value
  }
  public SetZ(value:number) {
    this.z = value
  }

  public Add(value:Vector3):Vector3 {
    return new Vector3(this.x+value.x,this.y+value.y,this.z+value.z)
  }

  public Subtract(value:Vector3):Vector3 {
    return new Vector3(this.x-value.x,this.y-value.y,this.z-value.z)
  }

  public Multiply(value:number):Vector3 {
    return new Vector3(this.x*value,this.y*value,this.z*value)
  }

  public Divide(value:number):Vector3 {
    return new Vector3(this.x/value,this.y/value,this.z/value)
  }

  public Length():number {
    return IvSqrt(this.LengthSquared())
  }

  public LengthSquared():number{
    return this.x*this.x + this.y*this.y + this.z*this.z
  }

  public Normalize():Vector3 {
    const lengthsqrd = this.LengthSquared()
    if(IvIsZero(lengthsqrd)){
      return Vector3.zero
    }

    const recip = IvInverseSqrt(lengthsqrd)
    const normalized = this.Multiply(recip)

    return normalized
  }

  public Dot(value:Vector3):number{
    return this.x*value.x+this.y*value.y+this.z+value.z
  }

  public Distance(point1:Vector3,point2:Vector3):number{
    return IvSqrt(this.DistanceSquared(point1,point2))
  }

  public DistanceSquared(point1:Vector3,point2:Vector3):number{
    const x = point1.x - point2.x
    const y = point1.y - point2.y
    const z = point1.z - point2.z

    return (x*x+y*y+z*z)
  }
}

export default Vector3