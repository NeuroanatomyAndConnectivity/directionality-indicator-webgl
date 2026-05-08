export interface AttribDef {
  name: string;
  /** Float32Array, Uint8Array, etc. */
  data: ArrayBufferView;
  /** Number of components per vertex (e.g. 3 for vec3). */
  size: number;
  /** GL type, e.g. gl.FLOAT, gl.UNSIGNED_BYTE. */
  type: number;
  /** Whether to normalize integer types into [0,1] / [-1,1]. */
  normalized: boolean;
}

export interface MeshGL {
  vao: WebGLVertexArrayObject;
  ebo: WebGLBuffer;
  indexCount: number;
  indexType: number;
}

export function createMeshVAO(
  gl: WebGL2RenderingContext,
  attribs: { def: AttribDef; location: number }[],
  indices: Uint32Array | Uint16Array,
): MeshGL {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error("createVertexArray failed");
  gl.bindVertexArray(vao);

  for (const { def, location } of attribs) {
    if (location < 0) continue; // attribute not used by current program
    const vbo = gl.createBuffer();
    if (!vbo) throw new Error(`createBuffer failed for ${def.name}`);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, def.data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, def.size, def.type, def.normalized, 0, 0);
  }

  const ebo = gl.createBuffer();
  if (!ebo) throw new Error("createBuffer failed for EBO");
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  gl.bindVertexArray(null);

  return {
    vao,
    ebo,
    indexCount: indices.length,
    indexType: indices instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT,
  };
}
