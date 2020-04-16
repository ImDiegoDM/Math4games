import Vector3 from "./Vector3"
import * as _ from "lodash"

const emptyArray = [0,0,0,0,0,0,0,0,0]

class Matrix3x3 {
  private mv = [9]

  constructor(value:number[]) {
    this.mv = value
  }

  public static CreateEmpty(){
    return new Matrix3x3(_.cloneDeep(emptyArray))
  }

  public GetElement(row:number,col:number){
    return this.mv[row+3*col]
  }

  public VectorMultiplication(vector:Vector3):Vector3{
    const result = Vector3.zero

    result.SetX(this.mv[0]*vector.GetX() + this.mv[3]*vector.GetY() + this.mv[6]*vector.GetZ())
    result.SetY(this.mv[1]*vector.GetX() + this.mv[4]*vector.GetY() + this.mv[7]*vector.GetZ())
    result.SetZ(this.mv[2]*vector.GetX() + this.mv[5]*vector.GetY() + this.mv[8]*vector.GetZ())

    return result
  }

  public MatrixMultiplication(matrix:Matrix3x3):Matrix3x3{
    const result = Matrix3x3.CreateEmpty()

    result.mv[0] = this.mv[0]*matrix.mv[0] + this.mv[3]*matrix.mv[1] + this.mv[6]*matrix.mv[2]
    result.mv[1] = this.mv[1]*matrix.mv[0] + this.mv[4]*matrix.mv[1] + this.mv[7]*matrix.mv[2]
    result.mv[2] = this.mv[2]*matrix.mv[0] + this.mv[5]*matrix.mv[1] + this.mv[8]*matrix.mv[2]

    result.mv[3] = this.mv[0]*matrix.mv[3] + this.mv[3]*matrix.mv[4] + this.mv[6]*matrix.mv[5]
    result.mv[4] = this.mv[1]*matrix.mv[3] + this.mv[4]*matrix.mv[4] + this.mv[7]*matrix.mv[5]
    result.mv[5] = this.mv[2]*matrix.mv[3] + this.mv[5]*matrix.mv[4] + this.mv[8]*matrix.mv[5]

    result.mv[6] = this.mv[0]*matrix.mv[6] + this.mv[3]*matrix.mv[7] + this.mv[6]*matrix.mv[8]
    result.mv[7] = this.mv[1]*matrix.mv[6] + this.mv[4]*matrix.mv[7] + this.mv[7]*matrix.mv[8]
    result.mv[8] = this.mv[2]*matrix.mv[6] + this.mv[5]*matrix.mv[7] + this.mv[8]*matrix.mv[8]

    return result
  }

  public ScalarMultiply(value:number){
    const result = Matrix3x3.CreateEmpty()

    for (let i = 0; i < 9; i++) {
      result.mv[i] = this.mv[i]+value
    }

    return result
  }

  public Multiply(m:Matrix3x3){
    const result = Matrix3x3.CreateEmpty()

    for (let i = 0; i < 9; i++) {
      result.mv[i] = this.mv[i]+m.mv[i]
    }

    return result
  }
}

export default Matrix3x3