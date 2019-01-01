'use strict';

import React from 'react';
import { render } from 'react-dom';
import AppLabel from 'SrcReact/main-dom.jsx';

export default class AppRenderer {
  static doRendering() {
    render( <AppLabel/> , document.getElementById('app'));
  }
}
