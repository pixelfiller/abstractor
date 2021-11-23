const svgCanvas = document.querySelector('.svgCanvas');
const svg = svgCanvas.querySelector('#svg'),
      svgRect = svg.getBoundingClientRect(),
      svgWidth = svgRect.width,
      svgHeight = svgRect.height;

module.exports = {
    svgCanvas,
    svg,
    svgRect,
    svgWidth,
    svgHeight,
}