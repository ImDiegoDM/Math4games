import { Shader } from "./Shader"

export class Render{
  gl:WebGL2RenderingContext

  constructor(id:string){
    const c = document.querySelector<HTMLCanvasElement>("#glCanvas")

    this.gl = c.getContext("webgl2")
  }

  public UseProgram(program:WebGLProgram){
    this.gl.useProgram(program)
  }

  public LoadShader(s:Shader):WebGLShader{
    const shader = this.gl.createShader(s.type)

    this.gl.shaderSource(shader,s.content)
    this.gl.compileShader(shader)

    const success = this.gl.getShaderParameter(shader,this.gl.COMPILE_STATUS)

    if(success){
      return shader
    }

    const err = this.gl.getShaderInfoLog(shader)
    this.gl.deleteShader(shader)
    throw err
  }

  public CreateProgram(){
    return this.gl.createProgram()
  }

  public AttachShader(program:WebGLProgram,shader:WebGLShader){
    this.gl.attachShader(program,shader)
  }

  public LinkProgram(program:WebGLProgram){
    this.gl.linkProgram(program)
  }

  public GetProgramInfoLog(program:WebGLProgram){
    return this.gl.getProgramInfoLog(program)
  }

  public GetProgramtLinkStatus(program:WebGLProgram){
    return this.gl.getProgramParameter(program,this.gl.LINK_STATUS)
  }

  public GetAttributeLocation(program:WebGLProgram,attr:string){
    return this.gl.getAttribLocation(program,attr)
  }

  public CreateBuffer(){
    return this.gl.createBuffer()
  }
}