import Vector3 from "./Vector3"

class Line{
  private mDirection:Vector3
  private mOrigin:Vector3

  constructor(direction:Vector3,origin:Vector3){
    this.mDirection = direction.Normalize()
    this.mOrigin = origin
  }
}

export default Line