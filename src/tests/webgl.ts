import { GLObject2D } from "../lib/Matin/GLObject";
import frag from "./shaders/frag";
import vert from "./shaders/vertex";
import redFrag from "./shaders/redFrag"
import { Render } from "../lib/Matin/Render";

export function run(){
  const c = document.querySelector<HTMLCanvasElement>("#glCanvas")

  const gl = c.getContext("webgl2")

  const positions = [
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
  ];

  const positions1 = [
    -2.0,  0,
     0,  0,
    -2.0, -2.0,
     0, -2.0,
  ];

  const obj = new GLObject2D({
    vertex:positions,
    vertexShader: vert,
    fragShader: frag
  })
  const obj1 = new GLObject2D({
    vertex:positions1,
    vertexShader: vert,
    fragShader: redFrag
  })

  Render.Create(gl,[obj,obj1])
  Render.Draw()
}