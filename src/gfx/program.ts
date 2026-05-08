export interface ShaderProgram {
  program: WebGLProgram;
  uniforms: Map<string, WebGLUniformLocation>;
  attribs: Map<string, number>;
}

export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
  name: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error(`createShader failed for ${name}`);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "(no log)";
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed [${name}]:\n${log}`);
  }
  return shader;
}

export function linkProgram(
  gl: WebGL2RenderingContext,
  vertexSrc: string,
  fragmentSrc: string,
  name: string,
): ShaderProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc, `${name}.vert`);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc, `${name}.frag`);
  const program = gl.createProgram();
  if (!program) throw new Error(`createProgram failed for ${name}`);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program) ?? "(no log)";
    gl.deleteProgram(program);
    throw new Error(`Program link failed [${name}]:\n${log}`);
  }

  const uniforms = new Map<string, WebGLUniformLocation>();
  const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < numUniforms; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    const loc = gl.getUniformLocation(program, info.name);
    if (loc) uniforms.set(info.name, loc);
  }
  const attribs = new Map<string, number>();
  const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES) as number;
  for (let i = 0; i < numAttribs; i++) {
    const info = gl.getActiveAttrib(program, i);
    if (!info) continue;
    attribs.set(info.name, gl.getAttribLocation(program, info.name));
  }
  return { program, uniforms, attribs };
}
