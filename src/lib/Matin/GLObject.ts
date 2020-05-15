import { Shader } from "./Shader";
import { Render } from "./Render";

export interface GLObject{
  vertex: number[];
  vertexCount: number;
  fragShader: Shader;
  vertexShader: Shader;
  Draw:()=>void;
  Init:()=>void;
}

interface GLObject2DOpts{
  vertex: number[];
  fragShader: Shader;
  vertexShader: Shader;
}

export class GLObject2D implements GLObject{
  vertex: number[]
  vertexCount = 2
  fragShader: Shader;
  vertexShader: Shader;

  constructor(opts:GLObject2DOpts){
    this.vertex = opts.vertex;
    this.fragShader = opts.fragShader;
    this.vertexShader = opts.vertexShader;
  }

  Init(){
    Render.RegisterShader(this.fragShader)
    Render.RegisterShader(this.vertexShader)
  }

  Draw(){
    Render.DrawTriangleStrip(this.vertex.length/2)
  }
}