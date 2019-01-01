// shader_engine_helper.js
// Coded by Yota Odaka

'use strict';

import * as THREE from 'three';

export default class ShaderEngineHelper {

  static rotateHue(vec4color, speed) {
    var hsl = {};
    var rgb = new THREE.Color(vec4color.x,
                              vec4color.y,
                              vec4color.z);
    rgb.getHSL(hsl);
    hsl.h += speed;
    hsl.h %= 1.0;
    rgb.setHSL(hsl.h, hsl.s, hsl.l);

    return new THREE.Vector4(rgb.r, rgb.g, rgb.b, vec4color.w);
  }

  static
  makeVector2(x, y) {
		return new THREE.Vector2(x, y);
	}

  static
	makeVector3(x, y, z) {
		return new THREE.Vector3(x, y, z);
	}

  static
	makeVector4(x, y, z, w) {
		return new THREE.Vector4(x, y, z, w);
	}

  static
	makeColor(r, g, b, a) {
		return new THREE.Color(r, g, b, a);
	}

}
