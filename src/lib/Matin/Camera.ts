import { mat4 } from 'gl-matrix'

export class Camera{
  private fieldOfView = 45 * Math.PI / 180;
  private aspect:number;
  private zNear:number;
  private zFar:number;

  constructor(aspect:number){
    this.aspect = aspect;
    this.zNear = 0.1
    this.zFar = 100.0
  }

  public getProjectionMatrix(){
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,
      this.fieldOfView,
      this.aspect,
      this.zNear,
      this.zFar
    );

    return projectionMatrix
  }
}