/**
 * Hover tooltip helper for the side panel.
 *
 * Single <div> appended to <body> on first use, repositioned per-target via
 * getBoundingClientRect. Default placement is to the LEFT of the target
 * (panel sits on the right edge of the viewport, so left-side has space).
 * Auto-flips to above-the-target when left would overflow, then to below.
 *
 * - 400 ms hover delay before show; immediate hide on mouseleave/mousedown.
 * - pointer-events: none (CSS) so the tooltip never intercepts clicks.
 * - Editable inputs hide the tooltip on mousedown so it doesn't cover the
 *   number the user is about to type.
 */

let tooltipEl: HTMLDivElement | null = null;
let activeTarget: HTMLElement | null = null;
let showTimer: number | null = null;

function ensureEl(): HTMLDivElement {
  if (tooltipEl) return tooltipEl;
  const el = document.createElement("div");
  el.className = "panel-tooltip";
  el.setAttribute("role", "tooltip");
  document.body.appendChild(el);
  tooltipEl = el;
  return el;
}

function position(target: HTMLElement, el: HTMLDivElement): void {
  // Reset to top-left so we can measure natural size without prior placement
  // skewing the layout.
  el.style.left = "0px";
  el.style.top = "0px";
  el.style.maxWidth = "240px";
  // Force reflow / measurement.
  const tipRect = el.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const margin = 10;
  // Default: place to the left of the target, vertically centered.
  let left = rect.left - tipRect.width - margin;
  let top = rect.top + rect.height / 2 - tipRect.height / 2;
  // Flip 1: above the target if left would overflow off-screen.
  if (left < margin) {
    left = rect.left + rect.width / 2 - tipRect.width / 2;
    top = rect.top - tipRect.height - margin;
    // Flip 2: below the target if also overflows the top.
    if (top < margin) {
      top = rect.bottom + margin;
    }
  }
  // Final clamp so we never spill off-screen.
  const maxLeft = window.innerWidth - tipRect.width - margin;
  const maxTop = window.innerHeight - tipRect.height - margin;
  left = Math.max(margin, Math.min(left, maxLeft));
  top = Math.max(margin, Math.min(top, maxTop));
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

function show(target: HTMLElement, text: string): void {
  const el = ensureEl();
  el.textContent = text;
  el.classList.add("visible");
  activeTarget = target;
  // Position after layout pass so we get accurate measurements.
  requestAnimationFrame(() => {
    if (activeTarget !== target) return; // hidden in the meantime
    position(target, el);
  });
}

function hide(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  activeTarget = null;
  if (tooltipEl) tooltipEl.classList.remove("visible");
}

/**
 * Attach a hover tooltip to `target`. No-op if `text` is empty/missing.
 * Listeners are added once per target; duplicate attaches will stack so
 * call sites should attach exactly once.
 */
export function attachTooltip(target: HTMLElement, text: string | undefined): void {
  if (!text) return;
  target.addEventListener("mouseenter", () => {
    if (showTimer !== null) clearTimeout(showTimer);
    showTimer = window.setTimeout(() => {
      showTimer = null;
      show(target, text);
    }, 400);
  });
  target.addEventListener("mouseleave", hide);
  target.addEventListener("mousedown", hide);
}

// Hide on scroll / window resize — the cached rect would be stale.
window.addEventListener("scroll", hide, true);
window.addEventListener("resize", hide);
