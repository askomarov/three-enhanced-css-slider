import * as THREE from "three";
import vertexParticles from "./shaders/vertexParticles.glsl";
import fragment from "./shaders/fragmentShader.glsl";
import vertexParticles2 from "./shaders/vertexParticles2.glsl";
import fragment2 from "./shaders/fragmentShader2.glsl";
import vertex from "./shaders/vertex.glsl";

import { createRandomString, getRandomFromRange } from "./utils.js";

class Sketch {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.container2 = document.getElementById('canvas2');
    this.sliderWrappers = [...document.querySelectorAll(".slider__slide")];
    this.encodedSlides = [
      ...document.querySelectorAll(".slider.encoded .slider__slide"),
    ];

    this.sliderPosition = -2 * (360 + 200);
    this.separator = document.querySelector('.separator');
    this.realSeparator = document.querySelector('.real-separator');
    // Основные параметры

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.scene = new THREE.Scene();
    this.scene2 = new THREE.Scene();
    let frustumSize = 1;
    let aspect = this.width / this.height;
    this.camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      -1000,
      1000
    );
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);
    this.renderer = this.createRenderer();
    this.renderer2 = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer2.setSize(this.container2.offsetWidth, this.container2.offsetHeight);

    if (this.container2) {
      this.container2.appendChild(this.renderer2.domElement);
    } else {
      console.error(`Элемент с id #canvas2 не найден.`);
    }
    this.cube = this.createCube();

    this.time = 0;
    this.frame = 0;
    this.isPlaying = true;
    this.isActive = false;
    this.mousePos = new THREE.Vector2(0, 0);

    // Запускаем инициализацию
    this.init();
  }

  async init() {
    // Добавляем объекты на сцену
    this.addObjects();

    this.populateEncodedSlides();

    // Обработчики событий
    this.addEventListeners();

    // Добавляем освещение
    this.addLight();

    // Запуск анимации
    this.animate();
  }

  populateEncodedSlides() {
    this.encodedSlides.forEach((slide) => {
      let string = createRandomString(600);
      slide.innerHTML = string;
    });
  }

  // Создание рендера
  createRenderer() {
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(this.width, this.height);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (this.container) {
      this.container.appendChild(renderer.domElement);
    } else {
      console.error(`Элемент с id "${this.containerId}" не найден.`);
    }

    return renderer;
  }

  addLight() {
    const hemiLight = new THREE.HemisphereLight(0x099ff, 0xaa5500);
    this.scene.add(hemiLight);
  }

  createCube() {
    // particles
    this.planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      fragmentShader: fragment,
      vertexShader: vertexParticles,
    });

    let geo = new THREE.BufferGeometry();
    let number = 1500;
    let positions = new Float32Array(number * 3);
    let sizes = new Float32Array(number);
    let velocity = new Float32Array(number);
    let distance = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      let i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = Math.random() - 0.5 + 0.5 *(Math.random() - 0.5);
      positions[i3 + 1] *=0.66;
      positions[i3 + 2] = 0;

      sizes[i] = getRandomFromRange(1, 13);
      velocity[i] = getRandomFromRange(0.1, 1);
      distance[i] = getRandomFromRange(0.1, 1);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aVelocity', new THREE.BufferAttribute(velocity, 1));
    geo.setAttribute('aDistance', new THREE.BufferAttribute(distance, 1));
    this.planeMesh = new THREE.Mesh(this.planeGeometry, this.material);
    this.points = new THREE.Points(geo, this.material);
    this.scene.add(this.points);
  }

  addObjects() {
    // particles
    this.material2 = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      fragmentShader: fragment2,
      vertexShader: vertexParticles2,
    });

    let geo2 = new THREE.BufferGeometry();
    let number = 500;
    let positions = new Float32Array(number * 3);
    let sizes = new Float32Array(number);
    let velocity = new Float32Array(number);
    let distance = new Float32Array(number);
    let random = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      let i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = Math.random() - 0.5 + 0.5 *(Math.random() - 0.5);
      positions[i3 + 1] *=0.66;
      positions[i3 + 2] = 0;
      random[i] = Math.random();

      sizes[i] = getRandomFromRange(1, 13);
      velocity[i] = getRandomFromRange(0.1, 1);
      distance[i] = getRandomFromRange(0.1, 1);
    }
    geo2.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo2.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo2.setAttribute('aVelocity', new THREE.BufferAttribute(velocity, 1));
    geo2.setAttribute('aDistance', new THREE.BufferAttribute(distance, 1));
    geo2.setAttribute('aRandom', new THREE.BufferAttribute(random, 1));

    this.points2 = new THREE.Points(geo2, this.material2);
    this.scene2.add(this.points2);
  }

  // Обработчик изменения размеров окна
  onWindowResize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width,this.height);

    this.renderer2.setSize(this.container2.offsetWidth,this.container2.offsetHeight);
    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove(evt) {
    this.mousePos.x = (evt.clientX / this.width) * 2 - 1;
    this.mousePos.y = -(evt.clientY / this.height) * 2 + 1;
  }

  // Добавление обработчиков событий
  addEventListeners() {
    window.addEventListener("resize", this.onWindowResize.bind(this));

    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
  }

  checkIfActive() {
    const half = window.innerWidth / 2;
    let isAnySlideActive = false;

    this.encodedSlides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;

      // Проверяем, пересекает ли центр слайда линию в центре экрана
      if (slideCenter >= half - rect.width / 2 && slideCenter <= half + rect.width / 2) {
        isAnySlideActive = true;
      }
    });

    this.isActive = isAnySlideActive;
    return this.isActive;
  }

  // Анимация
  animate() {
    if (!this.isPlaying) return;
    this.time += 0.05;
    requestAnimationFrame(this.animate.bind(this));

    this.frame += 1;
    this.material.uniforms.time.value = this.time;
    this.material2.uniforms.time.value = this.time;
    this.sliderPosition += 1;
    this.sliderWrappers.forEach((wrapper, index) => {
      wrapper.style.transform = `translateX(${this.sliderPosition}px)`;
    });
    if (this.sliderPosition > 0) {
      this.sliderPosition = -2 * (360 + 200);
    }

    if (this.frame % 30 === 0) {
      this.populateEncodedSlides();
    }
    if(this.checkIfActive()) {
      this.container.style.opacity = 1;
      this.separator.style.opacity = 1;
      this.realSeparator.style.opacity = 1;
    } else {
      this.container.style.opacity = 0;
      this.separator.style.opacity = 0;
      this.realSeparator.style.opacity = 0.5;
    }

    this.renderer.render(this.scene, this.camera);
    this.renderer2.render(this.scene2, this.camera);
  }
}

export default Sketch;
