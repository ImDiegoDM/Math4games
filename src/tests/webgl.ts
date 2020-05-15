import { Program } from "../lib/Matin/Program";
import { GLObject2D } from "../lib/Matin/GLObject";
import shaders from "./shaders/index";

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

  const obj = new GLObject2D(positions,'baseFrag','baseVertex')
  const obj1 = new GLObject2D(positions1,'redFrag','baseVertex')

  try{
    const p = new Program(gl,[obj,obj1],shaders)
    p.Draw()
  }catch (log){
    console.log(log)
  }

}