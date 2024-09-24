varying vec2 vUv;
varying float traveled;
varying float vRandom;
void main() {
  if(length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;
  // float alpha = 1. - traveled;
  vec3 finalColor = mix(
    vec3(1.),
    vec3(0.345, 0.281, 0.543),
    mod(vRandom, 0.5)
  );
  gl_FragColor = vec4(finalColor, 0.4);
}
