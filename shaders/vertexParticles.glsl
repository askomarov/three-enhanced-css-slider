uniform float time;
varying vec2 vUv;
varying vec3 vPostion;
attribute float aDistance;
attribute float aVelocity;
attribute float aSize;
varying float traveled;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.x = mod(0.2*aVelocity*time, aDistance);

  traveled = pos.x;
  pos.x*=0.2;

  vec4 mvPostion = modelViewMatrix * vec4(pos, 1.);
  gl_PointSize = aSize * (1. / - mvPostion.z);
  gl_Position = projectionMatrix * mvPostion;
}
