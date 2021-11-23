var {shapesSliders} = require('./controls.js');
var {
  Blob,
  Ellipse,
  Circle,
  Superellipse,
  Supershape,
  Line,
  Polygon,
  ZigZag,
  Wave,
  Bezier,
  Rectangle,
} = require('./shapes.js');


export class Artwork {
  constructor() {
    this.shapes = {
      blobs: [],
      ellipses: [],
      circles: [],
      superellipses: [],
      supershapes: [],
      lines: [],
      polygons: [],
      zigzags: [],
      waves: [],
      beziers: [],
      rectangles: [],
    }
  }
  draw() {
    shapesSliders.forEach(slider => {
      slider.onChange(value => {
        let shape = slider.property;
        if (value > this.shapes[shape].length) {
          for (let i = this.shapes[shape].length; i < value; i++) {
            switch (shape) {
              case 'blobs':
                this.shapes[shape][i] = new Blob();
                break;
              case 'ellipses':
                this.shapes[shape][i] = new Ellipse();
                break;
              case 'circles':
                this.shapes[shape][i] = new Circle();
                break;
              case 'superellipses':
                this.shapes[shape][i] = new Superellipse();
                break;
              case 'supershapes':
                this.shapes[shape][i] = new Supershape();
                break;
              case 'lines':
                this.shapes[shape][i] = new Line();
                break;
              case 'polygons':
                this.shapes[shape][i] = new Polygon();
                break;
              case 'zigzags':
                this.shapes[shape][i] = new ZigZag();
                break;
              case 'waves':
                this.shapes[shape][i] = new Wave();
                break;
              case 'beziers':
                this.shapes[shape][i] = new Bezier();
                break;
              case 'rectangles':
                this.shapes[shape][i] = new Rectangle();
                break;
              default:
                return
            }
            this.shapes[shape][i].create();
          }
        }
        if (value < this.shapes[shape].length) {
          let diff = this.shapes[shape].length - value;
          for (let i = 0; i < diff; i++) {
            this.shapes[shape][value - i].remove();
            this.shapes[shape].splice(value - i, 1);
          }
        }
      });
    });
  }
}