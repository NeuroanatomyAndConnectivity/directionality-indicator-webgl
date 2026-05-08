export interface FramebufferAttachment {
  /** Internal format (e.g. gl.RGBA8, gl.RGBA16F, gl.RGBA32F). */
  internalFormat: number;
  /** Format (e.g. gl.RGBA). */
  format: number;
  /** Type (e.g. gl.UNSIGNED_BYTE, gl.FLOAT, gl.HALF_FLOAT). */
  type: number;
  /** Min filter (default: gl.LINEAR). */
  minFilter?: number;
  /** Mag filter (default: gl.LINEAR). */
  magFilter?: number;
  /** Wrap S (default: gl.CLAMP_TO_EDGE). */
  wrapS?: number;
  /** Wrap T (default: gl.CLAMP_TO_EDGE). */
  wrapT?: number;
  /** If true, generateMipmap will be called on the texture. */
  mipmap?: boolean;
}

export interface FramebufferSpec {
  width: number;
  height: number;
  /** Color attachments in order (gl.COLOR_ATTACHMENT0, _1, ...). */
  colors: FramebufferAttachment[];
  /** If true, attach a depth texture. */
  depth: boolean;
}

export interface Framebuffer {
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  colorTextures: WebGLTexture[];
  depthTexture: WebGLTexture | null;
  /** Bind for drawing. Sets viewport to (0, 0, width, height) and configures drawBuffers. */
  bind(): void;
  /** Resize all attachments. Re-allocates textures. */
  resize(w: number, h: number): void;
  /** Generate mipmaps on attachments that have mipmap=true. */
  generateMipmaps(): void;
}

export function createFramebuffer(
  gl: WebGL2RenderingContext,
  spec: FramebufferSpec,
): Framebuffer {
  // Verify EXT_color_buffer_float for float formats.
  const usesFloat = spec.colors.some((c) => c.type === gl.FLOAT || c.type === gl.HALF_FLOAT);
  if (usesFloat && !gl.getExtension("EXT_color_buffer_float")) {
    throw new Error("EXT_color_buffer_float not supported — cannot create float-format FBO");
  }

  const fbo = gl.createFramebuffer();
  if (!fbo) throw new Error("createFramebuffer failed");

  let colorTextures: WebGLTexture[] = [];
  let depthTexture: WebGLTexture | null = null;

  function allocate(width: number, height: number): void {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);

    // Free old textures.
    for (const t of colorTextures) gl.deleteTexture(t);
    if (depthTexture) gl.deleteTexture(depthTexture);
    colorTextures = [];
    depthTexture = null;

    spec.colors.forEach((c, i) => {
      const tex = gl.createTexture();
      if (!tex) throw new Error(`createTexture failed for color attachment ${i}`);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, c.internalFormat, width, height, 0, c.format, c.type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, c.minFilter ?? gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, c.magFilter ?? gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, c.wrapS ?? gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, c.wrapT ?? gl.CLAMP_TO_EDGE);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, tex, 0);
      colorTextures.push(tex);
    });

    if (spec.depth) {
      const dtex = gl.createTexture();
      if (!dtex) throw new Error("createTexture failed for depth attachment");
      gl.bindTexture(gl.TEXTURE_2D, dtex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT32F, width, height, 0, gl.DEPTH_COMPONENT, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, dtex, 0);
      depthTexture = dtex;
    }

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
      throw new Error(`Framebuffer incomplete: 0x${status.toString(16)}`);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  allocate(spec.width, spec.height);

  const fb: Framebuffer = {
    fbo,
    get width() { return spec.width; },
    get height() { return spec.height; },
    get colorTextures() { return colorTextures; },
    get depthTexture() { return depthTexture; },
    bind() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, spec.width, spec.height);
      const draws = spec.colors.map((_, i) => gl.COLOR_ATTACHMENT0 + i);
      gl.drawBuffers(draws);
    },
    resize(w, h) {
      spec.width = w;
      spec.height = h;
      allocate(w, h);
    },
    generateMipmaps() {
      spec.colors.forEach((c, i) => {
        if (c.mipmap) {
          gl.bindTexture(gl.TEXTURE_2D, colorTextures[i]);
          gl.generateMipmap(gl.TEXTURE_2D);
        }
      });
      if (spec.depth && depthTexture) {
        gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    },
  };

  return fb;
}
