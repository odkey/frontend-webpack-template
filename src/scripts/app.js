// app.js
// Coded by Yota Odaka

'use strict';

// Stylesheet
import 'SrcScss/style.scss';

// Shaders
import * as vert from 'SrcShaders/shader.vert';
import * as frag from 'SrcShaders/shader.frag';

// Graphics
import ShaderEngine from 'SrcGraphics/shader_engine';

// React
import AppRenderer from 'SrcReact/main.jsx';


var engine = new ShaderEngine(vert, frag);
// import ShaderEngineHelper from './shader_engine_helper';

engine.setUniformsUpdateMethod(function(/*uniforms*/) {

});

AppRenderer.doRendering();

window.onload = engine.applyShaderToBackground;
