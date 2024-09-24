import * as THREE from "three";

const getRandomColor = () => {
  const randomHue = Math.random() * 360; // Случайный оттенок (0-360)
  const randomSaturation = Math.random() * 100; // Случайная насыщенность (0-100%)
  const randomLightness = 10 + Math.random() * 90; // Случайная яркость (0-100%)

  const randomColor = new THREE.Color(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`);

  return randomColor;
};

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    if (Math.random()> 0.95) {
      result += '<strong>'+chars[number % chars.length]+'</strong>';
      result += ' '
    } else {
      result += chars[number % chars.length];
      result += ' '
    }
  });
  return result;
}

function getRandomFromRange(start, end) {
  let r = Math.random();
  return r * (end - start) + start;
}

export { getRandomColor, createRandomString, getRandomFromRange }
