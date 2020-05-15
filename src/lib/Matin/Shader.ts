import { Program } from "./Program";
import { GLObject } from "./GLObject";

export interface Shader{
  content:string;
  type:number;
  LoadAttributes?(program:Program,obj:GLObject):void;
}