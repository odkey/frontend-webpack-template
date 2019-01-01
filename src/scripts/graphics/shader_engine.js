// shader_engine.js
// Coded by Yota Odaka

'use strict';

import * as THREE from 'three';

export default class ShaderEngine {

  constructor(vertexShader, fragmentShader) {
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // camera
    this.camera = new THREE.OrthographicCamera(- this.width * 0.5, this.width * 0.5, this.height * 0.5, - this.height * 0.5, 0.1, 1000);
    this._resizeCamera();
    this.camera.position.set(0, 0, 1);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this._resizeRenderer();
    this.renderer.setClearColor(0xFFFFFF);

    // Scene
    this.scene = new THREE.Scene();
    // uniforms
    this.uniformsUpdateMethod = function() {};
    this.uniforms = {
      time: { value: 0.0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      scroll: { value: new THREE.Vector2(0, 0) },
      resolution: {	value: new THREE.Vector2(this.width, this.height) },
    };

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true,
      // blending: THREE.AdditiveBlending
    });

    this.planeMesh = new THREE.Mesh(this.geometry, this.material);
    this.planeMesh.scale.set(this.width, this.height, 1);

    this.scene.add(this.planeMesh);

    // Utilities
    this.clock = new THREE.Clock();

    // Event
    document.body.appendChild(this.renderer.domElement);

    window.onresize = this._onWindowResized.bind(this);
    window.addEventListener('mousemove', this._onMouseMoved.bind(this));
    window.onscroll = this._onScrolled.bind(this);

    this.addUniform = this.addUniform.bind(this);

    this.applyShaderToBackground = this.applyShaderToBackground.bind(this);
  }

  addUniform(key, value) {
    this.uniforms[key] = {};
    this.uniforms[key].value = value;
  }

  setUniformsUpdateMethod(func) {
    this.uniformsUpdateMethod = func;
  }

  applyShaderToBackground() {
    this.uniforms.time.value += this.clock.getDelta();

    this.uniformsUpdateMethod(this.uniforms);
    this.planeMesh.material.uniforms = this.uniforms;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.applyShaderToBackground);
  }

  _resizeCamera() {
    this.camera.left = -this.width / 2;
    this.camera.right = this.width / 2;
    this.camera.bottom = -this.height / 2;
    this.camera.top = this.height / 2;
    this.camera.near = 0.1;
    this.camera.far = 1000;
    this.camera.updateProjectionMatrix();
  }

  _resizeRenderer() {
    this.renderer.setSize(this.width, this.height);
  }

  _onWindowResized() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this._resizeRenderer();
    this._resizeCamera();

    this.planeMesh.scale.set(this.width, this.height);
    this.uniforms.resolution.value.set(this.width, this.height);
  }

  _onMouseMoved(e) {
    this.uniforms.mouse.value.set(e.clientX, e.clientY);
  }

  _onScrolled() {
    this.uniforms.scroll.value.set(
      document.documentElement.scrollLeft || document.body.scrollLeft,
      document.documentElement.scrollTop || document.body.scrollTop);
  }

}
