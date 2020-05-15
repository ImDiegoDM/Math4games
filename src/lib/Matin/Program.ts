import { Shader } from "./Shader";
import { GLObject, GLObject2D } from "./GLObject";
import { mat4 } from 'gl-matrix'
import { Camera } from "./Camera";

interface Shaders{
  vertex:{
    [key:string]: Shader
  },
  frag:{
    [key:string]: Shader
  }
}

export class Program{
  gl:WebGL2RenderingContext
  private program: WebGLProgram
  private objs: GLObject[]
  private shaders: Shaders
  private camera: Camera
  private currVertex: string
  private currFrag: string

  constructor(gl:WebGL2RenderingContext, objs: GLObject[], shaders:Shaders){
    this.gl = gl
    this.shaders = shaders
    this.objs = objs
    this.camera = new Camera(
      (this.gl.canvas as HTMLCanvasElement).clientWidth / (this.gl.canvas as HTMLCanvasElement).clientHeight
    )

    this.program = this.gl.createProgram()
  }

  public GetProgramtLinkStatus(program:WebGLProgram){
    return this.gl.getProgramParameter(program,this.gl.LINK_STATUS)
  }

  public Draw(){
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);  
    this.gl.clearDepth(1.0);                 
    this.gl.enable(this.gl.DEPTH_TEST);           
    this.gl.depthFunc(this.gl.LEQUAL);  
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const projectionMatrix = this.camera.getProjectionMatrix();

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);  // amount to translate

    for (const obj of this.objs) {
      this.LoadShaders(obj)

      this.gl.linkProgram(this.program);
      this.gl.useProgram(this.program)

      this.gl.uniformMatrix4fv(
        this.gl.getUniformLocation(this.program, 'uProjectionMatrix'),
        false,
        projectionMatrix
      );

      this.gl.uniformMatrix4fv(
        this.gl.getUniformLocation(this.program, 'uModelViewMatrix'),
        false,
        modelViewMatrix
      );

      if(this.shaders.vertex[obj.vertexShader].LoadAttributes){
        this.shaders.vertex[obj.vertexShader].LoadAttributes(this,obj)
      }
      if(this.shaders.frag[obj.fragShader].LoadAttributes){
        this.shaders.frag[obj.fragShader].LoadAttributes(this,obj)
      }
      obj.Draw(this)
    }
  }

  public DrawGLObject2D(obj:GLObject2D){
    this.gl.drawArrays(WebGL2RenderingContext.TRIANGLE_STRIP,0,obj.vertex.length/2)
  }

  public LoadShaders(obj:GLObject){
    this.program = this.gl.createProgram()

    const vert = this.LoadShader(this.shaders.vertex[obj.vertexShader])
    this.gl.attachShader(this.program, vert);

    const frag = this.LoadShader(this.shaders.frag[obj.fragShader])
    this.gl.attachShader(this.program, frag);
    
  }

  public setArrayAttribute(name:string,size:number,type:number,position:number[]){
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(position),
      this.gl.STATIC_DRAW
    );

    const positionAttributeLocation = this.gl.getAttribLocation(this.program,name)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,positionBuffer)

    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      false,
      0,
      0
    )

    this.gl.enableVertexAttribArray(positionAttributeLocation)

    return positionAttributeLocation
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

  public CreateBuffer(){
    return this.gl.createBuffer()
  }

  public BindArrayBuffer(buffer:WebGLBuffer){
    return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer)
  }

  public BufferArrayData(src:any,usage:number){
    return this.gl.bufferData(this.gl.ARRAY_BUFFER,src,usage)
  }

  public EnableVertexAttribArray(location:number){
    return this.gl.enableVertexAttribArray(location)
  }

  public VertexAttribPointer(
    index:number,
    size:number,
    type:number,
    normalized:boolean,
    stride:number,
    offset:number
  ){
    this.gl.vertexAttribPointer(index,size,type,normalized,stride,offset)
  }
}