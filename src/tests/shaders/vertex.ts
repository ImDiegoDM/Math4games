import { Shader } from "../../lib/Matin/Shader"
import { GLObject } from "../../lib/Matin/GLObject"
import { Render } from "../../lib/Matin/Render"

const vert:Shader = {
  name:'baseVert',
  content:`
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `,
  type: WebGL2RenderingContext.VERTEX_SHADER,
  LoadAttributes(obj:GLObject){
    Render.SetArrayAttribute('aVertexPosition',2,WebGL2RenderingContext.FLOAT,obj.vertex)
  }
}

export default vert