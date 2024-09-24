uniform float time;
varying vec2 vUv;
varying vec3 vPostion;
attribute float aDistance;
attribute float aVelocity;
attribute float aSize;
attribute float aRandom;
varying float traveled;
varying float vRandom;
void main() {
  vUv = uv;
  vec3 pos = position;
  vRandom = aRandom;
  pos.x = mod(0.02*aVelocity*time - aRandom, 1.);

  traveled = pos.x;
  pos.x = (pos.x - 0.5) * 5.;

  vec4 mvPostion = modelViewMatrix * vec4(pos, 1.);
  gl_PointSize = aSize * (1. / - mvPostion.z);
  gl_Position = projectionMatrix * mvPostion;
}
