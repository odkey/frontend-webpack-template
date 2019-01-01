// shader.frag
// Coded by Yota Odaka

uniform vec2 resolution;
uniform vec2 mouse;
uniform vec2 scroll;
uniform float time;
varying vec2 vUv;

void main() {
	float red = sin(time) / 2.0 + 0.5;
  gl_FragColor = vec4(red, 1.0, 1.0, 1.0);
}
