#version 300 es
precision highp float;

in vec4 v_color;
in vec3 v_normal_world;

out vec4 out_color;

void main() {
  vec3 n = normalize(v_normal_world);
  // Cheap view-space-z lighting; matches the original arrow fragment shader's
  // light approximation so mesh + arrows share aesthetic.
  float light = clamp(0.4 + 0.6 * abs(n.z), 0.0, 1.0);
  out_color = vec4(v_color.rgb * light, v_color.a);
}
