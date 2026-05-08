#version 300 es
precision highp float;

in vec3 a_position;
in vec3 a_normal;
in vec4 a_color;

uniform mat4 u_view;
uniform mat4 u_projection;

out vec4 v_color;
out vec3 v_normal_world;

void main() {
  gl_Position = u_projection * u_view * vec4(a_position, 1.0);
  v_color = a_color;
  v_normal_world = a_normal;
}
