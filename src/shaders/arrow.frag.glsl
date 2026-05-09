#version 300 es
precision highp float;

uniform float u_widthTails;     // matches original default 0.25
uniform float u_arrowHeadFrac;  // head fraction of total length, default 0.25 (legacy)
uniform vec4 u_arrowColor;      // a = mix factor between region color (a=0) and arrow color (a=1)
uniform float u_arrowOpacity;   // 0..1; final fragment alpha (with shade-edge anti-alias)

in vec4 v_color;
in vec3 v_normal;
in vec2 v_surfaceUV;

out vec4 fragColor;

void main() {
  float shade;

  // Quad y in [-1, 1]. Head occupies the top 2*headFrac (y in [headThr, 1]),
  // body occupies the rest (y in [-1, headThr]). Default headFrac=0.25
  // reproduces the original 0.5 threshold.
  float headFrac = max(u_arrowHeadFrac, 0.001);
  float headThr = 1.0 - 2.0 * headFrac;

  if (v_surfaceUV.y >= headThr) {
    // Arrow head: triangle. arrowHeadY=1 at base (y=headThr), 0 at apex (y=1).
    float arrowHeadY = (1.0 - v_surfaceUV.y) / (2.0 * headFrac);
    float leftEdge = -arrowHeadY;
    float rightEdge = arrowHeadY;
    float leftStep = 1.0 - smoothstep(leftEdge - 0.15, leftEdge, v_surfaceUV.x);
    float rightStep = smoothstep(rightEdge - 0.15, rightEdge, v_surfaceUV.x);
    shade = 1.0 - (rightStep + leftStep);
  } else {
    // Arrow body: rectangle of width u_widthTails.
    float body = abs(v_surfaceUV.x);
    float skip = step(u_widthTails, body);
    shade = 1.0 - skip;
  }

  if (shade < 0.01) discard;

  // Cheap view-direction Lambert (matches the original arrow fragment's lighting).
  float light = clamp(0.1 + pow(abs(dot(v_normal, vec3(0.0, 0.0, 1.0))), 2.0), 0.0, 1.0);

  vec3 mixed = mix(v_color.rgb, u_arrowColor.rgb, u_arrowColor.a);
  // Use shade as anti-alias factor on the alpha; multiply by global opacity.
  // With BLEND (SRC_ALPHA, ONE_MINUS_SRC_ALPHA) on the host side, this gives true
  // semi-transparent arrows that let the LIC underlay show through.
  fragColor = vec4(mixed * light, clamp(shade, 0.0, 1.0) * u_arrowOpacity);
}
