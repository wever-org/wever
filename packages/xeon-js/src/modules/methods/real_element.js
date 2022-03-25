/**
 * @Collection Of all required ELEMENTs to be used in XEON JS.
 * @author - CodeWithArif
 * @license - License can be found in LICENSE file.
 * @copyright - All rights resurved.
 */

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
const dom = window.document;
var isParent = false;

/**
 * @IMP - Those collections are by default selected by the wever team.
 * Yet you can customize these.
 */
const NS = {
      /**
       * All important namespace uris.
       * Collected from both MDN(https://developer.mozilla.org/) and W3(https://www.w3.org/)
       * Some of these namespaces can be hard to find.
       */
      NAMESPACE_URI: {
            // from W3
            html: 'http://www.w3.org/1999/xhtml',
            svg: 'http://www.w3.org/2000/svg',
            xml: 'http://www.w3.org/XML/1998/namespace',
            xlink: 'http://www.w3.org/1999/xlink',
            xmlns: 'http://www.w3.org/2000/xmlns/', // sic for the final slash...
            MathML: 'http://www.w3.org/1998/Math/MathML',
            // from MDN
            XUL: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul',
            XBL: 'http://www.mozilla.org/xbl',
      },

      // This is a list of all svg elements.
      // All of these are taken from mdn.
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Element#svg_elements_a_to_z
      SVG_ELEMENTS: ["a", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tspan", "use", "view"],

      // This is a list of all deprecated svg elements.
      // All of these are taken from mdn.
      // These are old SVG elements which are deprecated and should not be used.
      // You should never use them in new projects, and should replace them in old projects as soon as you can.
      // They are listed here for informational purposes only.
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Element#obsolete_and_deprecated_elements
      SVG_DEPRECATED_ELEMENTS: ["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "cursor", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "glyph", "glyphRef", "hkern", "missing-glyph", "tref", "vkern",],

};

/**
 * @method - This method is used to create real elements in the document.
 * 
 * @param {String} tag
 * @param {HTMLElement} parent
 */
export default function createRealElement(tag, parent) {

      /**
       * @global
       * If parent exist then set isParent to true;
       */
      isParent = !(parent === undefined);

      // console.log(isParent);
      // return canUseDOM ? (isParent ? dom.createElementNS(NS.NAMESPACE_URI[tag], tag, parent) : dom.createElementNS(NS.NAMESPACE_URI[tag], tag)) : null;
      
}