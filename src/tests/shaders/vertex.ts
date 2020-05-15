import { Shader } from "../../lib/Matin/Shader"
import { Program } from "../../lib/Matin/Program"
import { GLObject } from "../../lib/Matin/GLObject"

const vert:Shader = {
  content:`
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `,
  type: WebGL2RenderingContext.VERTEX_SHADER,
  LoadAttributes(program:Program,obj:GLObject){
    program.setArrayAttribute('aVertexPosition',2,WebGL2RenderingContext.FLOAT,obj.vertex)
  }
}

export default vert