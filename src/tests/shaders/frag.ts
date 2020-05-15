import { Shader } from "../../lib/Matin/Shader"

const frag:Shader = {
  content:`
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `,
  type: WebGL2RenderingContext.FRAGMENT_SHADER
}

export default frag