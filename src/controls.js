import * as dat from 'dat.gui';
const gui = new dat.GUI();
var { parameters, styles, positions } = require('./settings.js');
let { svg } = require('./svgCanvas.js')
let SvgSaver = require('svgsaver');
let svgsaver = new SvgSaver();



var styleSelector = gui.add(parameters, 'style', styles).setValue('random');
var positionSelector = gui.add(parameters, 'position', positions).setValue('random');
var blobsSlider = gui.add(parameters, 'blobs').min(0).max(100).step(1)
var ellipsesSlider = gui.add(parameters, 'ellipses').min(0).max(100).step(1)
var circlesSlider = gui.add(parameters, 'circles').min(0).max(100).step(1)
var superellipsesSlider = gui.add(parameters, 'superellipses').min(0).max(100).step(1)
var supershapesSlider = gui.add(parameters, 'supershapes').min(0).max(100).step(1)
var linesSlider = gui.add(parameters, 'lines').min(0).max(100).step(1)
var polygonsSlider = gui.add(parameters, 'polygons').min(0).max(100).step(1)
var zigzagsSlider = gui.add(parameters, 'zigzags').min(0).max(100).step(1)
var wavesSlider = gui.add(parameters, 'waves').min(0).max(100).step(1)
var beziersSlider = gui.add(parameters, 'beziers').min(0).max(100).step(1)
var rectanglesSlider = gui.add(parameters, 'rectangles').min(0).max(100).step(1)
var saveAsPNGButton = gui.add({ saveAsPNG: () => { svgsaver.asPng(svg) } }, 'saveAsPNG');
var saveAsSVGButton = gui.add({ saveAsSVG: () => { svgsaver.asSvg(svg) } }, 'saveAsSVG');

export let shapesSliders = [
  blobsSlider,
  ellipsesSlider,
  circlesSlider,
  superellipsesSlider,
  supershapesSlider,
  linesSlider,
  polygonsSlider,
  zigzagsSlider,
  wavesSlider,
  beziersSlider,
  rectanglesSlider,
]