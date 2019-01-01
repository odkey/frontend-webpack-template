// shader.vert
// Coded by Yota Odaka

uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 scroll;
uniform float time;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
