import { Render } from "./Render";
import { Shader } from "./Shader";

export class Program{
  private render: Render
  private program: WebGLProgram
  private shaders:Shader[]

  constructor(id:string, ...shaders:Shader[]){
    this.render = new Render(id)
    this.program = this.render.CreateProgram()

    this.CreateAttachShaders(...shaders)

    this.render.LinkProgram(this.program)

    if(!this.render.GetProgramtLinkStatus(this.program)){
      throw this.render.GetProgramInfoLog(this.program)
    }

    this.LoadAttributes(...shaders)
    this.shaders = shaders
  }

  public Draw(){
    this.render.gl.viewport(0,0,this.render.gl.canvas.width,this.render.gl.canvas.height)

    this.render.gl.clearColor(0, 0, 0, 1);
    this.render.gl.clear(this.render.gl.COLOR_BUFFER_BIT);

    this.render.UseProgram(this.program)

    for (const s of this.shaders) {
      if(s.Draw){
        s.Draw(this)
      }
    }
  }

  public DrawTriangleStrips(count:number){
    this.render.gl.drawArrays(WebGL2RenderingContext.TRIANGLE_STRIP,0,count)
  }

  public CreateAttachShaders(...shaders:Shader[]){
    for (const shader of shaders) {
      const loadedShader = this.render.LoadShader(shader)
      this.render.AttachShader(this.program,loadedShader)
    }
  }

  private LoadAttributes(...shaders:Shader[]){
    for (const s of shaders) {
      if(s.HasAttributes()){
        s.LoadAttributes(this)
      }
    }
  }

  public GetAttributeLocation(attr:string){
    return this.render.GetAttributeLocation(this.program,attr)
  }

  public CreateBuffer(){
    return this.render.CreateBuffer()
  }

  public BindArrayBuffer(buffer:WebGLBuffer){
    return this.render.gl.bindBuffer(this.render.gl.ARRAY_BUFFER,buffer)
  }

  public BufferArrayData(src:any,usage:number){
    return this.render.gl.bufferData(this.render.gl.ARRAY_BUFFER,src,usage)
  }

  public EnableVertexAttribArray(location:number){
    return this.render.gl.enableVertexAttribArray(location)
  }

  public VertexAttribPointer(
    index:number,
    size:number,
    type:number,
    normalized:boolean,
    stride:number,
    offset:number
  ){
    this.render.gl.vertexAttribPointer(index,size,type,normalized,stride,offset)
  }
}