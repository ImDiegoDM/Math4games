import Vector3 from "./Vector3"
import * as _ from "lodash"
import { pad } from "../util/pad"
import { IvIsZero } from "./IvMath"

const emptyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]

class Matrix3x3 {
  private mv = [9]

  constructor(value: number[] = emptyArray) {
    this.mv = _.cloneDeep(value)
  }

  public static CreateEmpty() {
    return new Matrix3x3(_.cloneDeep(emptyArray))
  }

  public GetElement(row: number, col: number) {
    return this.mv[row + 3 * col]
  }

  public SetElement(row: number, col: number, value: number) {
    this.mv[row + 3 * col] = value
  }

  public SetRows(r1: Vector3, r2: Vector3, r3: Vector3) {
    this.mv[0] = r1.GetX();
    this.mv[3] = r1.GetY();
    this.mv[6] = r1.GetZ();

    this.mv[1] = r2.GetX();
    this.mv[4] = r2.GetY();
    this.mv[7] = r2.GetZ();

    this.mv[2] = r3.GetX();
    this.mv[5] = r3.GetY();
    this.mv[8] = r3.GetZ();
  }

  public VectorMultiplication(vector: Vector3): Vector3 {
    const result = Vector3.zero

    result.SetX(this.mv[0] * vector.GetX() + this.mv[3] * vector.GetY() + this.mv[6] * vector.GetZ())
    result.SetY(this.mv[1] * vector.GetX() + this.mv[4] * vector.GetY() + this.mv[7] * vector.GetZ())
    result.SetZ(this.mv[2] * vector.GetX() + this.mv[5] * vector.GetY() + this.mv[8] * vector.GetZ())

    return result
  }

  public Multiply(matrix: Matrix3x3): Matrix3x3 {
    const result = Matrix3x3.CreateEmpty()

    result.mv[0] = this.mv[0] * matrix.mv[0] + this.mv[3] * matrix.mv[1] + this.mv[6] * matrix.mv[2]
    result.mv[1] = this.mv[1] * matrix.mv[0] + this.mv[4] * matrix.mv[1] + this.mv[7] * matrix.mv[2]
    result.mv[2] = this.mv[2] * matrix.mv[0] + this.mv[5] * matrix.mv[1] + this.mv[8] * matrix.mv[2]

    result.mv[3] = this.mv[0] * matrix.mv[3] + this.mv[3] * matrix.mv[4] + this.mv[6] * matrix.mv[5]
    result.mv[4] = this.mv[1] * matrix.mv[3] + this.mv[4] * matrix.mv[4] + this.mv[7] * matrix.mv[5]
    result.mv[5] = this.mv[2] * matrix.mv[3] + this.mv[5] * matrix.mv[4] + this.mv[8] * matrix.mv[5]

    result.mv[6] = this.mv[0] * matrix.mv[6] + this.mv[3] * matrix.mv[7] + this.mv[6] * matrix.mv[8]
    result.mv[7] = this.mv[1] * matrix.mv[6] + this.mv[4] * matrix.mv[7] + this.mv[7] * matrix.mv[8]
    result.mv[8] = this.mv[2] * matrix.mv[6] + this.mv[5] * matrix.mv[7] + this.mv[8] * matrix.mv[8]

    return result
  }

  public ScalarMultiply(value: number) {
    const result = Matrix3x3.CreateEmpty()

    for (let i = 0; i < 9; i++) {
      result.mv[i] = this.mv[i] + value
    }

    return result
  }

  public Add(m: Matrix3x3) {
    const result = Matrix3x3.CreateEmpty()

    for (let i = 0; i < 9; i++) {
      result.mv[i] = this.mv[i] + m.mv[i]
    }

    return result
  }

  public Inverse(): Matrix3x3 {
    const result = new Matrix3x3()

    // compute determinant
    const cofactor0 = this.mv[4] * this.mv[8] - this.mv[5] * this.mv[7];
    const cofactor3 = this.mv[2] * this.mv[7] - this.mv[1] * this.mv[8];
    const cofactor6 = this.mv[1] * this.mv[5] - this.mv[2] * this.mv[4];
    const det = this.mv[0] * cofactor0 + this.mv[3] * cofactor3 + this.mv[6] * cofactor6;

    if (IvIsZero(det)) {
      throw "Matrix33::Inverse() -- singular matrix"
    }

    // create adjoint matrix and multiply by 1/det to get inverse
    const invDet = 1.0 / det;
    result.mv[0] = invDet * cofactor0;
    result.mv[1] = invDet * cofactor3;
    result.mv[2] = invDet * cofactor6;

    result.mv[3] = invDet * (this.mv[5] * this.mv[6] - this.mv[3] * this.mv[8]);
    result.mv[4] = invDet * (this.mv[0] * this.mv[8] - this.mv[2] * this.mv[6]);
    result.mv[5] = invDet * (this.mv[2] * this.mv[3] - this.mv[0] * this.mv[5]);

    result.mv[6] = invDet * (this.mv[3] * this.mv[7] - this.mv[4] * this.mv[6]);
    result.mv[7] = invDet * (this.mv[1] * this.mv[6] - this.mv[0] * this.mv[7]);
    result.mv[8] = invDet * (this.mv[0] * this.mv[4] - this.mv[1] * this.mv[3]);

    return result;
  }

  public Determinant(): number {
    return this.mv[0] * (this.mv[4] * this.mv[8] - this.mv[5] * this.mv[7])
      + this.mv[3] * (this.mv[2] * this.mv[7] - this.mv[1] * this.mv[8])
      + this.mv[6] * (this.mv[1] * this.mv[5] - this.mv[2] * this.mv[4]);
  }

  public Adjoint(): Matrix3x3 {
    const result = Matrix3x3.CreateEmpty()

    result.mv[0] = this.mv[4] * this.mv[8] - this.mv[5] * this.mv[7];
    result.mv[1] = this.mv[2] * this.mv[7] - this.mv[1] * this.mv[8];
    result.mv[2] = this.mv[1] * this.mv[5] - this.mv[2] * this.mv[4];

    result.mv[3] = this.mv[5] * this.mv[6] - this.mv[3] * this.mv[8];
    result.mv[4] = this.mv[0] * this.mv[8] - this.mv[2] * this.mv[6];
    result.mv[5] = this.mv[2] * this.mv[3] - this.mv[0] * this.mv[5];

    result.mv[6] = this.mv[3] * this.mv[7] - this.mv[4] * this.mv[6];
    result.mv[7] = this.mv[1] * this.mv[6] - this.mv[0] * this.mv[7];
    result.mv[8] = this.mv[0] * this.mv[4] - this.mv[1] * this.mv[3];

    return result;
  }

  public Print() {
    console.log(`| ${(this.mv[0])} ${(this.mv[3])} ${(this.mv[6])} |`)
    console.log(`| ${(this.mv[1])} ${(this.mv[4])} ${(this.mv[7])} |`)
    console.log(`| ${(this.mv[2])} ${(this.mv[5])} ${(this.mv[8])} |`)
  }
}

export default Matrix3x3