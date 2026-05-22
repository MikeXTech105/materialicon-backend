const sanitizeHtml = require('sanitize-html');
const { optimize } = require('svgo');

const removeDangerousSvgContent = (svgContent) => sanitizeHtml(svgContent, {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'svg',
    'path',
    'g',
    'circle',
    'rect',
    'line',
    'polyline',
    'polygon',
    'ellipse',
    'defs',
    'clipPath',
    'mask',
    'linearGradient',
    'radialGradient',
    'stop',
    'title',
    'desc',
    'use',
    'symbol'
  ]),
  allowedAttributes: {
    '*': [
      'id',
      'class',
      'fill',
      'stroke',
      'stroke-width',
      'stroke-linecap',
      'stroke-linejoin',
      'stroke-miterlimit',
      'stroke-dasharray',
      'stroke-dashoffset',
      'opacity',
      'transform',
      'clip-path',
      'mask',
      'd',
      'x',
      'y',
      'x1',
      'y1',
      'x2',
      'y2',
      'cx',
      'cy',
      'r',
      'rx',
      'ry',
      'width',
      'height',
      'viewBox',
      'xmlns',
      'version',
      'offset',
      'stop-color',
      'stop-opacity',
      'points',
      'href',
      'xlink:href'
    ]
  },
  allowedSchemes: ['http', 'https', 'data'],
  allowedSchemesByTag: {},
  disallowedTagsMode: 'discard',
  allowProtocolRelative: false
});

const sanitizeSvg = (svgContent) => {
  const withoutDangerousMarkup = removeDangerousSvgContent(svgContent);
  const optimized = optimize(withoutDangerousMarkup, {
    multipass: true,
    plugins: [
      'preset-default',
      {
        name: 'removeScripts',
        active: true
      },
      {
        name: 'removeAttrs',
        params: {
          attrs: ['on.*']
        }
      }
    ]
  });

  if (optimized.error) {
    throw new Error(optimized.error);
  }

  return optimized.data;
};

const extractSvgDimensions = (svgContent) => {
  const widthMatch = svgContent.match(/\swidth=["']?([\d.]+)(px)?["']?/i);
  const heightMatch = svgContent.match(/\sheight=["']?([\d.]+)(px)?["']?/i);
  const viewBoxMatch = svgContent.match(/\sviewBox=["']([^"']+)["']/i);

  let width = widthMatch ? Number(widthMatch[1]) : null;
  let height = heightMatch ? Number(heightMatch[1]) : null;

  if ((!width || !height) && viewBoxMatch) {
    const viewBoxParts = viewBoxMatch[1].split(/\s+/).map(Number);

    if (viewBoxParts.length === 4) {
      width = width || viewBoxParts[2];
      height = height || viewBoxParts[3];
    }
  }

  return {
    width,
    height
  };
};

module.exports = {
  sanitizeSvg,
  extractSvgDimensions
};
