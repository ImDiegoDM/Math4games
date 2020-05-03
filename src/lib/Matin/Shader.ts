import { Program } from "./Program";

export interface Shader{
  content:string;
  type:number;
  HasAttributes():boolean;
  LoadAttributes?(program:Program):void;
  Draw?(program:Program):void;
}