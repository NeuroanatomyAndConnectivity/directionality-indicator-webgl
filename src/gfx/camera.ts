import { mat3, mat4, quat, vec3 } from "gl-matrix";

export interface Camera {
  view: mat4;
  projection: mat4;
  attach(canvas: HTMLCanvasElement, onChange: () => void): void;
  fitSphere(center: vec3, radius: number): void;
  /** Set the camera orientation and distance to look at a target from a specific eye position. */
  setLookAt(eye: vec3, target: vec3, up: vec3): void;
  /** Return the current view state in the same form `setLookAt` accepts. */
  getViewState(): { eye: [number, number, number]; target: [number, number, number]; up: [number, number, number] };
  resize(width: number, height: number): void;
}

/**
 * Quaternion-accumulator trackball.
 *
 * Rotation: drag deltas rotate around the camera's LOCAL right axis (vertical drag)
 * and LOCAL up axis (horizontal drag), composed via a unit quaternion. No yaw/pitch
 * decomposition, so no gimbal lock — rotation works identically from any orientation.
 *
 * Zoom: distance multiplied exponentially per wheel tick, clamped to a window scaled
 * to the bounding sphere fed in via fitSphere(). minDistance keeps the camera from
 * passing through the surface; maxDistance keeps the mesh visible.
 */
export function createTrackball(): Camera {
  const view = mat4.create();
  const projection = mat4.create();

  const orientation = quat.create(); // identity → camera looks down +z toward origin
  const target = vec3.fromValues(0, 0, 0);
  let distance = 3;
  let minDistance = 0.01;
  let maxDistance = 1000;
  let aspect = 1;

  function rebuildView() {
    // eye = target + R * (0, 0, distance), up = R * world-up
    const offset = vec3.fromValues(0, 0, distance);
    vec3.transformQuat(offset, offset, orientation);
    const eye = vec3.create();
    vec3.add(eye, target, offset);

    const up = vec3.fromValues(0, 1, 0);
    vec3.transformQuat(up, up, orientation);

    mat4.lookAt(view, eye, target, up);
  }

  function rebuildProjection() {
    const fov = Math.PI / 4;
    const near = Math.max(0.001, distance * 0.01);
    const far = Math.max(1000, distance * 100);
    mat4.perspective(projection, fov, aspect, near, far);
  }

  function applyRotation(dxScreen: number, dyScreen: number) {
    // Camera-local axes in world space (cols of inverse view, equivalently the
    // rotation of world axes by `orientation`).
    const localRight = vec3.fromValues(1, 0, 0);
    vec3.transformQuat(localRight, localRight, orientation);
    const localUp = vec3.fromValues(0, 1, 0);
    vec3.transformQuat(localUp, localUp, orientation);

    const rotX = quat.create();
    quat.setAxisAngle(rotX, localRight, dyScreen);
    const rotY = quat.create();
    quat.setAxisAngle(rotY, localUp, dxScreen);

    quat.multiply(orientation, rotY, orientation);
    quat.multiply(orientation, rotX, orientation);
    quat.normalize(orientation, orientation);
  }

  rebuildView();
  rebuildProjection();

  return {
    view,
    projection,

    attach(canvas, onChange) {
      let dragging = false;
      let lastX = 0;
      let lastY = 0;

      canvas.addEventListener("pointerdown", (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
      });

      canvas.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        if (e.shiftKey) {
          // Pan: translate target along camera's right/up plane. World units
          // per screen pixel at the target's distance: 2 × distance × tan(fov/2)
          // / canvasHeight. Camera fov is π/4 → tan(π/8) ≈ 0.4142.
          const worldPerPx = (2 * distance * 0.4142) / Math.max(canvas.clientHeight, 1);
          const right = vec3.fromValues(1, 0, 0);
          vec3.transformQuat(right, right, orientation);
          const up = vec3.fromValues(0, 1, 0);
          vec3.transformQuat(up, up, orientation);
          // Drag right → object follows → target moves left (negate dx).
          target[0] += (-dx * right[0] + dy * up[0]) * worldPerPx;
          target[1] += (-dx * right[1] + dy * up[1]) * worldPerPx;
          target[2] += (-dx * right[2] + dy * up[2]) * worldPerPx;
        } else {
          // Rotate (default trackball).
          // Sensitivity: ~360° / canvas-width-pixels. Negate so the object
          // follows the drag (Three.js OrbitControls / Maya / Blender convention):
          // drag right → object's right side comes toward you → camera circles
          // left around the target.
          const sensitivity = (2 * Math.PI) / Math.max(canvas.clientWidth, 1);
          applyRotation(-dx * sensitivity, -dy * sensitivity);
        }
        rebuildView();
        rebuildProjection(); // near/far depend on distance
        onChange();
      });

      canvas.addEventListener("pointerup", (e) => {
        dragging = false;
        canvas.releasePointerCapture(e.pointerId);
      });

      canvas.addEventListener("pointercancel", (e) => {
        dragging = false;
        canvas.releasePointerCapture(e.pointerId);
      });

      canvas.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          // deltaY > 0 (scroll down) → zoom out; < 0 → zoom in.
          distance *= Math.exp(e.deltaY * 0.001);
          distance = Math.max(minDistance, Math.min(maxDistance, distance));
          rebuildView();
          rebuildProjection();
          onChange();
        },
        { passive: false },
      );
    },

    fitSphere(center, radius) {
      vec3.copy(target, center);
      const r = Math.max(radius, 1e-3);
      // Frame the sphere fully in the FOV with comfortable padding.
      distance = r * 2.5;
      // Zoom range: slightly inside the sphere at the close end, ~30× the
      // sphere radius at the far end.
      minDistance = r * 0.05;
      maxDistance = r * 30;
      rebuildView();
      rebuildProjection();
    },

    getViewState() {
      const offset = vec3.fromValues(0, 0, distance);
      vec3.transformQuat(offset, offset, orientation);
      const eye = vec3.create();
      vec3.add(eye, target, offset);
      const up = vec3.fromValues(0, 1, 0);
      vec3.transformQuat(up, up, orientation);
      return {
        eye: [eye[0], eye[1], eye[2]] as [number, number, number],
        target: [target[0], target[1], target[2]] as [number, number, number],
        up: [up[0], up[1], up[2]] as [number, number, number],
      };
    },

    setLookAt(eye, t, up) {
      vec3.copy(target, t);
      const offset = vec3.create();
      vec3.subtract(offset, eye, target);
      const dist = vec3.length(offset);
      if (dist < 1e-6) return;
      distance = dist;

      // Build a rotation matrix whose columns are R(+x), R(+y), R(+z).
      // Default convention in this Camera: orientation=identity → eye = target + (0,0,d), up = (0,1,0).
      // We want R(+z) = unit_offset, R(+y) = unit_up, R(+x) = R(+y) × R(+z).
      const fwd = vec3.create();
      vec3.scale(fwd, offset, 1 / dist); // R(+z): direction from target to eye
      const u = vec3.create();
      vec3.normalize(u, up);
      // Re-orthogonalize up against fwd.
      const right = vec3.create();
      vec3.cross(right, u, fwd);
      vec3.normalize(right, right);
      vec3.cross(u, fwd, right); // u = fwd × right (orthonormal)
      vec3.normalize(u, u);

      const m = mat3.fromValues(
        right[0], right[1], right[2],
        u[0], u[1], u[2],
        fwd[0], fwd[1], fwd[2],
      );
      quat.fromMat3(orientation, m);
      quat.normalize(orientation, orientation);
      rebuildView();
      rebuildProjection();
    },

    resize(width, height) {
      aspect = width / Math.max(1, height);
      rebuildProjection();
    },
  };
}
