/**
 * Create a VAO that draws a full-screen triangle with gl.drawArrays(gl.TRIANGLES, 0, 3).
 * The triangle's three corners are at (-1,-1), (3,-1), (-1,3) — covers the [-1,1]² screen
 * with one vertex per corner. Single tri is cheaper than a 2-tri quad and avoids the
 * diagonal seam that can introduce subtle interpolation artifacts.
 *
 * The vertex shader for full-screen passes should:
 *   in vec2 a_position;
 *   out vec2 v_texCoord;
 *   void main() { gl_Position = vec4(a_position, 0.0, 1.0); v_texCoord = a_position * 0.5 + 0.5; }
 */
export function createScreenQuad(
  gl: WebGL2RenderingContext,
  attribLocation: number,
): WebGLVertexArrayObject {
  if (attribLocation < 0) throw new Error("screenQuad: a_position attribute not found in program");
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed for screenQuad");
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  if (!vbo) throw new Error("createBuffer failed for screenQuad");
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(attribLocation);
  gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}
