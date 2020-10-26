import pkg from './package.json';

var banner =
  '/* @preserve\n' +
  ' * Leaflet Control Textinput ' +
  pkg.version +
  '\n' +
  ' * https://github.com/perliedman/leaflet-control-textinput\n' +
  ' *\n' +
  ' * Copyright (c) 2012 sa3m (https://github.com/sa3m)\n' +
  ' * Copyright (c) 2018 Per Liedman\n' +
  ' * Copyright (c) 2020 Andeas Schrell\n' +
  ' * All rights reserved.\n' +
  ' */\n';

var output = {
  file: 'dist/Control.Textinput.js',
  format: 'iife',
  name: 'L.Control.Textinput',
  sourcemap: true,
  globals: {
    leaflet: 'L'
  },
  banner: banner
};

export default {
  input: 'src/index.js',
  external: ['leaflet'],
  output: [
    output,
    Object.assign({}, output, {
      file: 'dist/Control.Textinput.min.js',
      plugins: []
    })
  ]
};
