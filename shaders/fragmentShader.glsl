varying vec2 vUv;
varying float traveled;

void main() {
  if(length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;
  float alpha = 1. - traveled;
  gl_FragColor = vec4(1., 1., 1., 0.4 * alpha);
}
