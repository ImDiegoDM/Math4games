import { Program } from "../lib/Matin/Program";
import frag from './shaders/frag';
import vert from './shaders/vertex';

export function run(){
  const p = new Program('glCanvas',frag,vert)

  p.Draw()
}