import { Program } from "../../lib/Matin/Program"

export default {
  position:[
    [
      0, 0,
      0, 0.5,
      0.7, 0,
      0.7,0.5
    ],
    [
      -0.2, -0.2,
      -0.2, -0.7,
      -0.9, -0.2,
      -0.9,-0.7
    ]
  ],
  positionAttributeLocation:undefined,
  content:`
  // an attribute will receive data from a buffer
  attribute vec4 a_position;

  // all shaders have a main function
  void main() {

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
  }
`,
  type: WebGL2RenderingContext.VERTEX_SHADER,
  HasAttributes(){
    return true
  },
  LoadAttributes(program:Program){
    this.positionAttributeLocation = program.GetAttributeLocation("a_position")

    const pBuffer = program.CreateBuffer()

    program.BindArrayBuffer(pBuffer)

    program.EnableVertexAttribArray(this.positionAttributeLocation)

    program.VertexAttribPointer(
      this.positionAttributeLocation,
      2,
      WebGL2RenderingContext.FLOAT,
      false,
      0,
      0
    )
  },
  Draw(program:Program){
    for (const p of this.position) {
      program.BufferArrayData(new Float32Array(p),WebGL2RenderingContext.STATIC_DRAW)
      program.DrawTriangleStrips(4)
    }
  }
}