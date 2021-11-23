var parameters = {
    blobs: 0,
    ellipses: 0,
    circles: 0,
    superellipses: 0,
    supershapes: 0,
    lines: 0,
    polygons: 0,
    zigzags: 0,
    waves: 0,
    beziers: 0,
    rectangles: 0,
    style: 'random',
    position: 'random',
  };    
  
  var styles = [
    'random',
    'fill-plain',
    'stroke-plain',
    'fill-gradient',
    'stroke-gradient',
  ];
  
  var positions = [
    'random',
    'central',
  ];

  module.exports = {parameters, styles, positions}