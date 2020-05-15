import Vector3 from "./Vector3";
import { IvIsZero, IvInverseSqrt, IvSqrt } from "./IvMath";

export class Quaternion{
  private x:number
  private y:number
  private z:number
  private w:number

  constructor(x:number,y:number,z:number,w:number){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public static get zero():Quaternion{
    return new Quaternion(0,0,0,0)
  }
  public static get identity():Quaternion{
    return new Quaternion(0,0,0,1)
  }

  public static CreateFromAxisAngle(v:Vector3,angle:number){
    const lgth = v.LengthSquared()
    if(IvIsZero(lgth)){
      return Quaternion.identity
    }

    const halfAngle = angle*0.5

    let sin = Math.sin(halfAngle)
    let cos = Math.cos(halfAngle)
    const scaleFactor = sin/IvSqrt(lgth)

    if(IvIsZero(sin)){
      sin = 0
    }

    if(IvIsZero(cos)){
      cos = 0
    }

    return new Quaternion(
      v.GetX()*scaleFactor,
      v.GetY()*scaleFactor,
      v.GetZ()*scaleFactor,
      cos
    )
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
  public GetW():number {
    return this.w
  }

  public Set(value:Quaternion){
    this.x = value.x;
    this.y = value.y;
    this.z = value.z;
    this.w = value.w;
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
  public SetW(value:number) {
    this.w = value
  }

  public Add(value:Quaternion){
    return new Quaternion(this.x + value.x,this.y + value.y, this.z + value.z, this.w + value.w)
  }

  public ScalarMultiply(value:number){
    return new Quaternion(
      this.x*value,
      this.y*value,
      this.z*value,
      this.w*value
    )
  }

  public Multiply(q:Quaternion){
    const w = q.w*this.w - q.x*this.x - q.y*this.y - q.z*this.z;
    const x = q.y*this.z - q.z*this.y + q.w*this.x + this.w*q.x;
    const y = q.z*this.x - q.x*this.z + q.w*this.y + this.w*q.y;
    const z = q.x*this.y - q.y*this.x + q.w*this.z + this.w*q.z;

    return new Quaternion(x,y,z,w)
  }

  public Length():number {
    return IvSqrt(this.LengthSquared())
  }
  
  public LengthSquared(){
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  }

  public Normalize(){
    const lgthS = this.LengthSquared()

    if(IvIsZero(lgthS)){
      return Quaternion.zero
    }

    const r = IvInverseSqrt(lgthS)

    return this.ScalarMultiply(r)
  }

  public Dot(value:Quaternion){
    return new Quaternion(
      this.x*value.x,
      this.y*value.y,
      this.z*value.z,
      this.w*value.w
    )
  }

  public Print(name = "quaternion"){
    console.log(`${name}(${this.x},${this.y},${this.z},${this.w})`)
  }
}