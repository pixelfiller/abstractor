import OpenSimplexNoise from 'open-simplex-noise';
import $ from 'jquery';
import * as random from './random.js';
let { parameters, styles } = require('./settings.js');
let { svg, svgWidth, svgHeight } = require('./svgCanvas.js')



export class Shape {
    constructor() {
      this.id = random.id();
      this.position();
      this.style();
    }
    position() {
      if (parameters.position == 'central') {
        this.x = svgWidth / 2;
        this.y = svgHeight / 2;
      }
      else if (parameters.position == 'random') {
        this.x = random.number(1, 600);
        this.y = random.number(1, 600);
      }
    }
    style() {
      randomGradient();
      var shapeStyle = 'fill-plain';
      let selectedStyle = parameters.style;
      if (selectedStyle == 'random') {
        shapeStyle = styles.slice(-4)[Math.floor(Math.random() * styles.slice(-4).length)]
      } 
      else {
        shapeStyle = selectedStyle;
      }
      switch (shapeStyle) {
        case 'fill-plain':
          this.style = `fill: ${random.color()}; stroke: none`;
          break;
        case 'stroke-plain':
          this.style = `fill: none; stroke: ${random.color()}; stroke-width: ${random.number(2,6)}`
          break;
        case 'fill-gradient':
          this.style = `fill: url(#gradient${random.number(0, 9)}); stroke: none`;
          break;
        case 'stroke-gradient':
          this.style = `fill: none; stroke: url(#gradient${random.number(0, 9)}); stroke-width: ${random.number(2,6)}`
          break;
      }
    }
  }
  
  
  
  function randomGradient() {
    for (var i = 0; i < 10; i++) {
      createGradient($(' svg')[0],`gradient${i}`,[
        {offset:'5%', 'stop-color': random.color()},
        {offset:'95%', 'stop-color': random.color()}
      ]);
    }
  }
  randomGradient();
  let defs;
  function createGradient(svg, id, stops) {
    var svgNS = svg.namespaceURI;
    let grad = document.createElementNS(svgNS, Math.random() < 0.5 ? 'radialGradient' : 'linearGradient');
    grad.setAttribute('id', id);
    // grad.setAttribute('gradientTransform', `rotate (135)`);
    grad.setAttribute('x', '0%');
    grad.setAttribute('y', '100%');
    for (let i = 0; i < stops.length; i++) {
      var attrs = stops[i];
      var stop = document.createElementNS(svgNS,'stop');
      for (var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
      }
      grad.appendChild(stop);
    }
  
    defs = svg.querySelector('defs') || svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild );
    return defs.appendChild(grad);
  }
  
  
  // function svgFilter() {
  //   const svgNS = svg.namespaceURI;
  //   let filter = document.createElementNS(svgNS, 'filter');
  //   filter.setAttribute('id', 'distort')
  //
  //   const feTurbulence = document.createElementNS(svgNS, 'feTurbulence');
  //   feTurbulence.setAttribute('baseFrequency', '.005') //random.number(.005, 0.05)
  //   feTurbulence.setAttribute('type', 'fractalNoise')
  //   const feDisplacementMap = document.createElementNS(svgNS, 'feDisplacementMap');
  //   feDisplacementMap.setAttribute('in', 'SourceGraphic')
  //   feDisplacementMap.setAttribute('scale', '100') //random.number(100, 150)
  //
  //   filter.appendChild(feTurbulence)
  //   filter.appendChild(feDisplacementMap)
  //
  //   defs = svg.querySelector('defs') || svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild );
  //   return defs.appendChild(filter);
  // }
  
  // <defs>
  //   <filter id="distort">
  //   <feTurbulence baseFrequency=".005" type="fractalNoise"/>
  //   <feDisplacementMap in="SourceGraphic" scale="100"></feDisplacementMap>
  //   </filter>
  //  </defs>
  
  
  export class Circle extends Shape {
    constructor() {
      super();
    }
    create() {
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
      element.setAttribute('cx', this.x);
      element.setAttribute('cy', this.y);
      element.setAttribute('r', random.number(10, 120));
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Ellipse extends Shape {
    constructor() {
      super();
    }
    create() {
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
      element.setAttribute('cx', this.x);
      element.setAttribute('cy', this.y);
      element.setAttribute('rx', random.number(10, 300));
      element.setAttribute('ry', random.number(10, 300));
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Line extends Shape {
    constructor() {
      super();
    }
    create() {
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      element.setAttribute('d', 'M' + this.x  + ',' + this.y + ' L' + random.number(1, 600) + ',' + random.number(1, 600));
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Wave extends Shape {
    constructor() {
      super();
    }
    create() {
      let x = this.x;
      let y = this.y;
  
      let waveHeight = svgHeight/2 + y;
      let waveWidth;
  
      if (parameters.position == 'central') {
        x = this.x - svgWidth;
        waveWidth = svgWidth;
      }
      if (parameters.position == 'random') {
        waveWidth = svgWidth/2 + x;
      }
      let amplitude = random.number(10, 100);
      let frequency = random.number(10, 100);
      let xyCoords = [];
      for (x; x < waveWidth; x++) {
        y = waveHeight/2 + amplitude * Math.sin(x/frequency);
        xyCoords.push(x,y);
      }
      let dataPoints = xyCoords.join(' ');
  
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
      element.setAttribute('points', dataPoints); 
      element.setAttribute('style', this.style);
      element.setAttribute('stroke-linejoin', 'round');
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  // export class Wave2 extends Shape {
  //   constructor() {
  //     super();
  //   }
  //   create() {
  //     const noise = new OpenSimplexNoise(Date.now());
  //     let x = 0;
  //     const frequencies = [0.01, 0.02, 0.03, 0.04, 0.05] // 0.1 - high, 0.001 - low
  //     let randomFrequency = random.picker(frequencies);
  //     const waveLengths = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600]
  //     let waveLength = random.picker(waveLengths);
  //     if (parameters.position == 'central') {
  //       this.x = 0;
  //       waveLength = svgWidth;
  //     }
  //     if (parameters.position == 'random') {
  //       x = this.x;
  //     }
  //     let y = this.y;
  //     let frequency = 0;
  //     let amplitude = random.number(10, 400);
  //     let xyCoords = [];
  //     for (this.x; x < waveLength; x ++) {
  //       y = noise.noise2D(frequency, frequency) * amplitude + this.y;
  //       xyCoords.push(x,y);
  //       frequency += randomFrequency;
  //     }
  
  //     let dataPoints = xyCoords.join(' ');
  
  //     let element = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
  //     element.setAttribute('points', dataPoints);
  //     element.setAttribute('style', this.style);
  //     // element.style.transform = "rotate(" + random.number(0, 360) + "deg)"; //use this for rotatition
  //     element.setAttribute('id', this.id);
  //     svg.appendChild(element);
  //   }
  //   remove() {
  //     document.getElementById(this.id).remove();
  //   }
  // }
  
  
  
  export class Blob extends Shape {
    constructor() {
      super();
    }
    create() {
      const noise = new OpenSimplexNoise(Date.now());
      const circle = {
        x: this.x,
        y: this.y,
        radius: random.number(100, 400)
      };
  
      let frequency = random.number(1, 5)
      let magnitude = random.number(0, 1);
      let xyCoords = [];
      let rrs = [];
      // Sample points evenly around the circle
      const samples = Math.floor(4 * circle.radius + 20);
      for (let j = 0; j < samples + 1; j += 0.1) {
        let angle = (2 * Math.PI * j) / samples;
  
        // Figure out the x/y coordinates for the given angle
        let xoff = Math.cos(angle) * frequency;
        let yoff = Math.sin(angle) * frequency;
  
        let r = noise.noise2D(xoff, yoff);
        rrs.push(r)
        // let radius = random.number(50, 200); //for crazy blobz
  
        let x = r * Math.cos(angle) * circle.radius + this.x;
        let y = r * Math.sin(angle) * circle.radius + this.y;
  
        xyCoords.push(x, y);
  
      }
      let dataPoints = xyCoords.join(' ');
      // polygon drawing
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
      element.setAttribute('points', dataPoints);
  
      // // path "d" drawing
      // let element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      // element.setAttribute('d', `M${dataPoints}`);
  
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Supershape extends Shape {
    constructor() {
      super();
    }
    create() {
      let n1 = Math.floor(random.number(1, 5)),
        n2 = Math.floor(random.number(1, 5)),
        n3 = Math.floor(random.number(1, 5)),
        m = random.evennumber(),
        a = 1,
        b = 1;
  
      function superformula(theta) {
  
        let part1 = (1 / a) * Math.cos(theta * m / 4);
        part1 = Math.abs(part1);
        part1 = Math.pow(part1, n2);
  
        let part2 = (1 / b) * Math.sin(theta * m / 4);
        part2 = Math.abs(part2);
        part2 = Math.pow(part2, n3);
  
        let part3 = Math.pow(part1 + part2, n1);
  
        if (part3 === 0) {
          return 0
        }
  
        return (1 / part3);
      }
      let radius = random.number(10,100);
      let xyCoords = [];
      for (var angle = 0; angle < 2 * Math.PI; angle += 0.01) {
        let r = superformula(angle);
        let x = radius * r * Math.cos(angle);
        let y = radius * r * Math.sin(angle);
  
        xyCoords.push(this.x + x, this.y + y);
      }
      let dataPoints = xyCoords.join(' ');
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
      element.setAttribute('points', dataPoints);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class ZigZag extends Shape {
    constructor() {
      super();
    }
    create() {
      let zigzagSpacing = random.number(20, 120);
      let xyCoords = [];
      for (let n = 0; n < random.number(4, 20); n++) {
        let x = this.x + ((n + 1) * zigzagSpacing) - 300;
        let y;
  
        if (n % 2 == 0) { // if n is even...
          y = this.y + random.number(30, 100);
        } else { // if n is odd...
          y = this.y;
        }
        xyCoords.push(x,y); //get x,y new coordinates and push them to array
      }
      let dataPoints = xyCoords.join(' ');
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
      element.setAttribute('id', 'textPath');
      element.setAttribute('points', dataPoints);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Superellipse extends Shape {
    constructor() {
      super();
    }
    create() {
      let radius = random.radius();
      let a = radius,
          b = radius,
          n = random.number(1, 6);
      let xyCoords = [];
      // context.moveTo(this.x + radius, this.y);
      for (var angle = 0; angle < 2 * Math.PI; angle += 0.01) {
        let x = Math.pow(Math.abs(Math.cos(angle)), 2/n) * a * Math.sign(Math.cos(angle));
        let y = Math.pow(Math.abs(Math.sin(angle)), 2/n) * b * Math.sign(Math.sin(angle));
  
        xyCoords.push(this.x + x, this.y + y);
      }
      let dataPoints = xyCoords.join(' ');
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
      element.setAttribute('points', dataPoints);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  
  export class Polygon extends Shape {
    constructor() {
      super();
    }
    create() {
      let xyCoords = [];
      for (var i = 1; i < random.number(3, 12); i++) {
        xyCoords.push(random.number(1, 600), random.number(1, 600));
      }
      let dataPoints = xyCoords.join(' ');
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
      element.setAttribute('points', dataPoints);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  export class Bezier extends Shape {
    constructor() {
      super();
    }
    create() {
      let dataPoints = `M ${this.x} ${this.y}, `
    for (let i = 0; i < random.number(1,3); i++) {
      dataPoints += `${random.number(0, 8) == 0 ? `M ${random.number(0, 600)} ${random.number(0, 600)}` : ""} Q ${random.number(0, 600)} ${random.number(0, 600)} ${random.number(0, 600)} ${random.number(0, 600)} `
    }
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      element.setAttribute('d', dataPoints);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }
  
  
  export class Rectangle extends Shape {
    constructor() {
      super();
    }
    create() {
      let height = random.number(0, 400),
          width = random.number(0, 400)
      
      let element = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      element.setAttribute('x', this.x - height/2);
      element.setAttribute('y', this.y - width/2);
      element.setAttribute('height', height);
      element.setAttribute('width', width);
      element.setAttribute('style', this.style);
      element.setAttribute('id', this.id);
  
      svg.appendChild(element);
    }
    remove() {
      document.getElementById(this.id).remove();
    }
  }