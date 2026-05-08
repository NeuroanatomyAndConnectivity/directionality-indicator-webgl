export interface View {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  width: number;
  height: number;
  requestRender(): void;
  onRender(cb: () => void): void;
  onResize(cb: () => void): void;
}

export function createView(container: HTMLElement): View {
  const canvas = document.createElement("canvas");
  container.appendChild(canvas);

  // alpha: true so screenshots can produce transparent-background PNGs.
  // The page background is var(--bg) so transparent canvas pixels still
  // appear dark in the live UI; only PNG export uses the transparency.
  // preserveDrawingBuffer: true so canvas.toBlob can read back pixels after
  // a render (otherwise the buffer is undefined post-swap on most drivers).
  const ctx = canvas.getContext("webgl2", {
    antialias: true,
    depth: true,
    alpha: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
  });
  if (!ctx) throw new Error("WebGL2 not supported in this browser");
  const gl: WebGL2RenderingContext = ctx;

  let renderCb: () => void = () => {};
  let resizeCb: () => void = () => {};
  let dirty = true;

  const view: View = {
    canvas,
    gl,
    get width() { return canvas.width; },
    get height() { return canvas.height; },
    requestRender() { dirty = true; },
    onRender(cb) { renderCb = cb; },
    onResize(cb) { resizeCb = cb; },
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = Math.floor(container.clientWidth * dpr);
    const h = Math.floor(container.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      resizeCb();
      dirty = true;
    }
  }

  function loop() {
    resize();
    if (dirty) {
      dirty = false;
      renderCb();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener("resize", resize);

  return view;
}

export function showBanner(message: string): void {
  const el = document.getElementById("banner");
  if (!el) return;
  el.textContent = message;
  el.style.display = "block";
}
