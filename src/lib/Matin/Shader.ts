import { GLObject } from "./GLObject";
import { Render } from "./Render";

export interface Shader{
  name:string;
  content:string;
  type:number;
  LoadAttributes?(obj:GLObject):void;
}