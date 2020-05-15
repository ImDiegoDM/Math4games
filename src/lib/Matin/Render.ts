import { Dictionary } from "./Dictionary"
import { Camera } from "./Camera"
import { Shader } from "./Shader"
import { GLObject } from "./GLObject"

export class Render{
  private gl:WebGL2RenderingContext
  private camera:Camera
  private shaders:Dictionary<Shader> = {}
  private shaderStack: string
  private shaderProgam: WebGLProgram
  private objs:GLObject[]

  public static instance:Render

  public static Create(gl:WebGL2RenderingContext,objs:GLObject[]){
    this.instance = new Render(gl,objs)
  }

  private constructor(gl:WebGL2RenderingContext,objs:GLObject[]){
    this.gl = gl
    this.objs = objs
    this.camera = new Camera(
      (this.gl.canvas as HTMLCanvasElement).clientWidth / (this.gl.canvas as HTMLCanvasElement).clientHeight
    )
  }

  private getShaderStack(obj:GLObject){
    return obj.fragShader.name + '@' + obj.vertexShader.name
  }

  private setUniformLocations(){
    const projectionMatrix = this.camera.GetProjectionMatrix();
    const modelViewMatrix = this.camera.GetModelViewMatrix();

    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.shaderProgam, 'uProjectionMatrix'),
      false,
      projectionMatrix
    );

    this.gl.uniformMatrix4fv(
      this.gl.getUniformLocation(this.shaderProgam, 'uModelViewMatrix'),
      false,
      modelViewMatrix
    );
  }

  private setBGandClear(){
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);  
    this.gl.clearDepth(1.0);                 
    this.gl.enable(this.gl.DEPTH_TEST);           
    this.gl.depthFunc(this.gl.LEQUAL);  
    
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  public loadShader(s:Shader):WebGLShader{
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

  private loadShadersAttribute(obj:GLObject){
    if(this.shaders[obj.vertexShader.name].LoadAttributes){
      this.shaders[obj.vertexShader.name].LoadAttributes(obj)
    }
    if(this.shaders[obj.fragShader.name].LoadAttributes){
      this.shaders[obj.fragShader.name].LoadAttributes(obj)
    }
  }

  private loadShaders(obj:GLObject){
    const stack = this.getShaderStack(obj)
    if(stack !== this.shaderStack){
      this.shaderProgam = this.gl.createProgram()

      if(!this.shaders[obj.vertexShader.name] || !this.shaders[obj.fragShader.name]){
        throw 'Shader not registered'
      }

      const vert = this.loadShader(this.shaders[obj.vertexShader.name])
      this.gl.attachShader(this.shaderProgam, vert);

      const frag = this.loadShader(this.shaders[obj.fragShader.name])
      this.gl.attachShader(this.shaderProgam, frag);

      this.gl.linkProgram(this.shaderProgam);
      this.gl.useProgram(this.shaderProgam);

      this.setUniformLocations()
    }
  }

  private DrawObj(obj:GLObject){
    this.loadShaders(obj)
    this.loadShadersAttribute(obj)
    obj.Draw()
  }

  public static SetArrayAttribute(name:string,size:number,type:number,position:number[]){
    const positionBuffer = this.instance.gl.createBuffer();
    this.instance.gl.bindBuffer(this.instance.gl.ARRAY_BUFFER, positionBuffer);

    this.instance.gl.bufferData(
      this.instance.gl.ARRAY_BUFFER,
      new Float32Array(position),
      this.instance.gl.STATIC_DRAW
    );

    const positionAttributeLocation = this.instance.gl.getAttribLocation(this.instance.shaderProgam,name)

    this.instance.gl.bindBuffer(this.instance.gl.ARRAY_BUFFER,positionBuffer)

    this.instance.gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      false,
      0,
      0
    )

    this.instance.gl.enableVertexAttribArray(positionAttributeLocation)
  }

  public static DrawTriangleStrip(vertexCount:number){
    if(!this.instance){
      throw 'Render not initialized'
    }

    this.instance.gl.drawArrays(WebGL2RenderingContext.TRIANGLE_STRIP,0,vertexCount)
  }

  public static RegisterShader(shader:Shader){
    if(!this.instance){
      throw 'Render not initialized'
    }

    if(this.instance.shaders[shader.name] === undefined){
      this.instance.shaders[shader.name] = shader
    }
  }

  public static Draw(){
    if(!this.instance){
      throw 'Render not initialized'
    }

    this.instance.setBGandClear()

    for (const obj of this.instance.objs) {
      obj.Init()
      this.instance.DrawObj(obj)
    }
  }
}