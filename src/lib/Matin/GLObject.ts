import { Shader } from "./Shader";
import { Program } from "./Program";

export interface GLObject{
  vertex: number[];
  vertexCount: number;
  fragShader: string;
  vertexShader: string;
  Draw:(program:Program)=>void;
}

export class GLObject2D implements GLObject{
  vertex: number[]
  vertexCount = 2
  fragShader: string;
  vertexShader: string;

  constructor(vertex: number[],fragShader: string, vertexShader: string){
    this.vertex = vertex;
    this.fragShader = fragShader;
    this.vertexShader = vertexShader;
  }

  Draw(program:Program){
    program.DrawGLObject2D(this)
  }
}