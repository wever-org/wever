// prevent babel from transpiling the code

/**
 * @file The main xeon file, this will only be imported.
 * 
 * @copyright noCopyright 2021-present, ChatCord, Inc.
 * This source code is licensed under the MIT license found in the
 * @license file in the root directory of this source tree.
 * 
 * @author CodeWithArif
 */
"use strict";

import autoBind from "./auto-bind";

var isLog = true;

const browserConsole = {

      define: function (e) {
            isLog = e;
      },

      /**
       * console.log(...);
       * 
       * @param  {...any} e 
       */
      log: function (...e) {
            var swLogStyle = `padding: 5px;
              background-color: #25832d;
              color: #fff;
              border-radius: 8px;
              font-weight: 800;`;
            if (isLog)
                  console.log("%cXeonJS : runtime", swLogStyle, ...e);
      },

      /**
       * console.error(...);
       * 
       * @param  {...any} e 
       */
      error: function (...e) {
            var swLogStyle = `padding: 5px;
              background-color: #a20909;
              color: #fff;
              border-radius: 8px;
              font-weight: 800;
              margin: 2px;
              margin-top: 1px;`;
            if (isLog)
                  console.error("%cXeonJS : runtime", swLogStyle, ...e);
      },

      /**
       * console.warn(...);
       * 
       * @param  {...any} e 
       */
      warn: function (...e) {
            var swLogStyle = `padding: 5px;
              background-color: #a07904;
              color: #fff;
              border-radius: 8px;
              font-weight: 800;
              margin: 2px;
              margin-top: 1px;`;
            if (isLog)
                  console.warn("%cXeonJS : runtime", swLogStyle, ...e);
      },

      /**
       * @description - Runtime logs
       */
      runtime: {
            /**
             * console.log(...);
             * 
             * @param  {...any} e 
             */
            log: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #25832d;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;`;
                  if (isLog)
                        console.log("%cXeonJS : runtime", swLogStyle, ...e);
            },

            /**
             * console.error(...);
             * 
             * @param  {...any} e 
             */
            error: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #a20909;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;
                    margin: 2px;
                    margin-top: 1px;`;
                  if (isLog)
                        console.error("%cXeonJS : runtime", swLogStyle, ...e);
            },

            /**
             * console.warn(...);
             * 
             * @param  {...any} e 
             */
            warn: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #a07904;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;
                    margin: 2px;
                    margin-top: 1px;`;
                  if (isLog)
                        console.warn("%cXeonJS : runtime", swLogStyle, ...e);
            }
      },

      /**
       * @description - Depricated logs
       */
      depricated: {
            /**
             * console.log(...);
             * 
             * @param  {...any} e 
             */
            log: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #25832d;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;`;
                  if (isLog)
                        console.log("%cXeonJS : Depricated", swLogStyle, ...e);
            },

            /**
             * console.error(...);
             * 
             * @param  {...any} e 
             */
            error: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #a20909;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;
                    margin: 2px;
                    margin-top: 1px;`;
                  if (isLog)
                        console.error("%cXeonJS : Depricated", swLogStyle, ...e);
            },

            /**
             * console.warn(...);
             * 
             * @param  {...any} e 
             */
            warn: function (...e) {
                  var swLogStyle = `padding: 5px;
                    background-color: #a07904;
                    color: #fff;
                    border-radius: 8px;
                    font-weight: 800;
                    margin: 2px;
                    margin-top: 1px;`;
                  if (isLog)
                        console.warn("%cXeonJS : Depricated", swLogStyle, ...e);
            }
      }
}
const bc = browserConsole;

/**
 * clear element
 */
HTMLElement.prototype.clear = function () {
      while (this.firstChild) {
            this.removeChild(this.firstChild);
      }
      return this;
}


/**
 * @main {function} xeon The main function, parent of all function related to xeon js.
 * @define {new xeon() => xeon} Then Export default.
 * @final @exports
 */

class xeon {

      /**
       * @var {HTMLElement} root.
       * @var {HTMLElement | function | Array} dom.
       * @var {Map} elements - Store all components with their componentNumber, attribute, children and current dom element.
       * @var {object} currentComponent - Store the last created or edited component with its properties.
       * @var {number} currentComponentNumber - the last component number created or edited.
       * @var {number} totalComponentNumber - the total number of component created.
       * @var {Boolean} editMode - True if any component is reRendering.
       */
      root;
      dom;
      #elements = new Map([]);
      #currentComponent = {};
      #currentComponentNumber = 0;
      #totalComponentNumber = 0;
      #reference = new Map([]);
      #totalReferenceNumber = 0;
      #editMode = false;
      #functionalOnInit;
      #matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");

      // This is a list of all svg elements.
      // All of these are taken from mdn.
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Element#svg_elements_a_to_z
      #SVG_ELEMENTS = ["svg-a", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath", "title", "tspan", "use", "view"];
      #SVG_ELEMENTS_REGEX = new RegExp(`^(?:${this.#SVG_ELEMENTS.join("|")})$`, "i");

      // This is a list of all deprecated svg elements.
      // All of these are taken from mdn.
      // These are old SVG elements which are deprecated and should not be used.
      // You should never use them in new projects, and should replace them in old projects as soon as you can.
      // They are listed here for informational purposes only.
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Element#obsolete_and_deprecated_elements
      #SVG_DEPRECATED_ELEMENTS = ["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "cursor", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "glyph", "glyphRef", "hkern", "missing-glyph", "tref", "vkern",];
      #SVG_DEPRECATED_ELEMENTS_REGEX = new RegExp(`^(?:${this.#SVG_DEPRECATED_ELEMENTS.join("|")})$`, "i");

      // This is a list of all SVG attributes that need special casing, namespacing,
      // or boolean value assignment. Regular attributes that just accept strings
      // and have the same names are omitted, just like in the HTML attribute filter.
      // Some of these attributes can be hard to find. This list was created by
      // scraping the MDN documentation.
      #SVG_ATTR = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'xmlns:xlink', 'x-height' // NOTE: if you add a camelCased prop to this list,
            // you'll need to set attributeName to name.toLowerCase()
            // instead in the assignment below.
      ];

      // String SVG attributes with the xlink namespace.
      #XLINK_NAMESPACE = ['xlink:actuate', 'xlink:arcrole', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type' // NOTE: if you add a camelCased prop to this list,
            // you'll need to set attributeName to name.toLowerCase()
            // instead in the assignment below.
      ];

      // String SVG attributes with the xml namespace.
      #XML_NAMESPACE = ['xml:base', 'xml:lang', 'xml:space' // NOTE: if you add a camelCased prop to this list,
            // you'll need to set attributeName to name.toLowerCase()
            // instead in the assignment below.
      ];

      #CAMELIZE = /[\-\:]([a-z])/g;
      #capitalize = function (token) {
            return token[1].toUpperCase();
      };

      constructor() {

            autoBind(this);

            this.theme = {
                  dark: this.#matchMediaDark.matches,
                  light: !this.#matchMediaDark.matches
            }

            this.#matchMediaDark.addListener(e => {
                  this.theme = {
                        dark: e.matches,
                        light: !e.matches
                  }
                  this.config(this.dom, this.root);
            });

      }


      /**
       * 
       * @param {function} v 
       * @returns {Boolean}
       * @protected
       */
      #isClass(v) {
            return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
      }

      /**
       * 
       * @param {string} path - url path.
       * @returns 
       * @protected
       */
      #pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)?") + "$");

      /**
       * getParams - get parametere from url
       * 
       * @param {object} match - route mached with current url.
       * @returns 
       * @protected
       */
      #getParams = match => {
            const values = match.result.slice(1);
            let keys;
            if (!Array.isArray(match.route.path)) {
                  keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
            } else {
                  match.route.path.forEach(path => {
                        const match = location.pathname.match(this.#pathToRegex(path));
                        if (match) {
                              keys = Array.from(path.matchAll(/:(\w+)/g)).map(result => result[1]);
                              return;
                        }
                  })
            }

            return Object.fromEntries(keys.map((key, i) => {
                  return [key, values[i]];
            }));
      };

      #observeDOM = (() => {
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            return function (obj, callback) {
                  var staticXeon = this;
                  if (MutationObserver) {
                        // define a new observer
                        var obs = new MutationObserver(function (mutations, observer) {
                              callback.bind(staticXeon)(mutations, observer);
                        });
                        // have the observer observe foo for changes in children
                        obs.observe(obj, { childList: true, subtree: true });

                        return obs;
                  }
            }
      }).bind(this)();

      /**
       * getPath - find out a path from dom, the routing configuration.
       * 
       * @param {string} query - path to find out from dom
       * @returns 
       */
      #getPath = query => {
            let result;
            if (Array.isArray(this.dom)) {
                  this.dom.forEach(route => {
                        if (!Array.isArray(route.path)) {
                              if (route.path === query) {
                                    result = route;
                              }
                        } else {
                              route.path.forEach(path => {
                                    if (path === query) {
                                          result = route;
                                    }
                              })
                        }
                  })
            }
            return result;
      }

      /**
       * navigateTo - navigate between pages with out reload.
       * 
       * @param {string} url - the url where to navigate.
       */
      navigateTo = (url) => {
            url = url.replace(/:(\w+)[^]*/g, "");
            // console.log(url);
            if (window.location.pathname !== url && window.location.href !== url && window.location.origin !== url) {
                  history.pushState(null, null, url);
                  this.config(this.dom, this.root);
            }
      }

      /**
      * The configuration Function. HTML Element to Dom Converter.
      *
      * @param {HTMLElement | Array} dom The HTMLElement to append or an Array of url routes.
      * @param {HTMLElement} root The HTMLElement from the dom, where to append.
      * 
      * @final append dom in root element.
      */
      config(dom, root) {

            /** Empty the root element */
            // while (root.firstChild) {
            //       root.removeChild(root.firstChild);
            // }
            root.clear();

            /** Store dom and root to the global for further uses. */
            this.root = root;
            this.dom = dom;

            /** @global {Array} match - an array with route and result of the matched URL location */
            var match;

            /**
             * @condition dom is a function. It must return a HTMLElement. Store it in Dom.
             */
            if (typeof dom === "function") {
                  dom = dom();
            }

            /**
             * @condition dom is an Array. It must be routing module.
             */
            if (dom && typeof dom === "object" && Array.isArray(dom)) {

                  /**
                   * @condition each item of the Array dom is an Object - Continue.
                   * @process Compare all routing configuration object's path with standard Regular Expression using #pathToRegex function.
                   * @global {Array} potentialMatches - Store the compared path's route & result.
                   * 
                   * @condition route.path is an Array. Try checking each item of it.
                   */
                  var potentialMatches = [];
                  dom.map(route => {

                        if (typeof route === "object") {

                              if (!Array.isArray(route.path)) {

                                    potentialMatches.push({
                                          route: route,
                                          result: location.pathname.match(this.#pathToRegex(route.path))
                                    });

                              } else {

                                    route.path.map(path => {
                                          potentialMatches.push({
                                                route: route,
                                                result: location.pathname.match(this.#pathToRegex(path))
                                          });
                                    });

                              }
                        }

                  });

                  /** @process store route where the path matchs th url location. */
                  match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
                  // console.log(potentialMatches);
                  const JSURI = this.getRunningScript();


                  /**
                   * @condition match exists. import the script defined in the "match.route.src"
                   * @process run the script's default export function / class. Pass the url parametere as the fuction property. get the parametere from #getParams function.
                   * The function must return HTMLElement. append this to the root element.
                   */
                  if (match) {

                        // const importPath = JSURI + "/../" + match.route.src;
                        const importPath = match?.route?.src;
                        if (match.route.src) {
                              import(importPath).then(module => {
                                    if (typeof module.default === "function") {
                                          dom = this.createElement(module.default, { params: this.#getParams(match) });
                                          this.root.appendChild(dom);
                                    } else {
                                          bc.error(`"${match.route.src}" doesn't export any default.`)
                                    }
                              }).catch(e => bc.error(`Can not find module named "${match.route.src}"\n${e}`))
                        } else if (match.route.component) {
                              if (typeof match.route.component === "function") {
                                    dom = this.createElement(match.route.component, { params: this.#getParams(match) });
                                    this.root.appendChild(dom);
                              } else {
                                    bc.error(`"${match.route.component.toString()}" is not a function.`);
                              }
                        }

                  } else {
                        /**
                         * @condition match doesn't exist. check if user adds any 404 error page in the routing confugeration. Store the result in route.
                         * @condition route exists. Import the script defined in the "route.src"
                         * @process run the script's default export function / class. Pass the url parametere as the fuction property. get the parametere from #getParams function.
                         * The function must return HTMLElement. append this to the root element.
                         */

                        let route = this.#getPath('/404');
                        // const importPath = JSURI + "/../" + route.src;
                        const importPath = route.src;

                        if (route) {

                              if (route.src) {
                                    import(importPath).then(module => {
                                          if (typeof module.default === "function") {
                                                dom = this.createElement(module.default, {});
                                                this.root.appendChild(dom);
                                          } else {
                                                bc.error(`"${route.src}" doesn't export any default.`)
                                          }
                                    }).catch(e => bc.error(`Can not find module named "${route.src}"`))
                              } else if (route.component) {
                                    if (typeof route.component === "function") {
                                          dom = this.createElement(route.component, {});
                                          this.root.appendChild(dom);
                                    } else {
                                          bc.error(`"${route.component.toString()}" is not a function.`);
                                    }
                              }

                        } else {

                              /**
                               * @condition route doesn't exist. Redirect user to the first route.
                               * @condition path of the dom's first item is an Array. Redirect to the first path.
                               * @else redirect to the path.
                               */
                              if (Array.isArray(dom[0].path)) {
                                    this.navigateTo(dom[0].path[0]);
                              } else {
                                    this.navigateTo(dom[0].path);
                              }

                        }

                  }

            }

            /**
             * create xset objects.
             */
            else if (dom && typeof dom === "object") {
                  // console.time('xset');
                  this.root.appendChild(this.XSET(dom));
                  // console.timeEnd('xset');
            }
      }

      /**
      * @description - test HTML tag before creating.
      * 
      * @param {string} elementName - name of the element to create.
      * @returns 
      */
      #test_tag(elementName) {
            if (elementName && typeof elementName === "string" && elementName !== "") {

                  /**
                   * Test the element if SVG or Deprecated SVG Element.
                   */
                  var isSVGElement = this.#SVG_ELEMENTS_REGEX.test(elementName.toLowerCase());
                  var isSVGElementDeprecated = this.#SVG_DEPRECATED_ELEMENTS_REGEX.test(elementName.toLowerCase());

                  if (elementName.toLowerCase() === "svg-a") {
                        elementName = "a";
                  }

                  if (!isSVGElement && !isSVGElementDeprecated) {
                        var element = document.createElement(elementName.toUpperCase());

                        /**
                         * Log If not a valid html element.
                         */
                        if (element.toString() === "[object HTMLUnknownElement]") {
                              bc.warn(`"${elementName}" is not a valid html element. To ignore warning {...}`);
                        }
                        return [element, element.toString() !== "[object HTMLUnknownElement]", undefined];
                  }

                  if (isSVGElement) {
                        // console.log(this.#SVG_ELEMENTS_REGEX, isSVGElement, elementName);
                        var element = document.createElementNS("http://www.w3.org/2000/svg", elementName.toLowerCase());

                        /**
                         * Log If not a valid svg element.
                         */
                        if (element.toString() === "[object SVGElement]") {
                              bc.warn(`"${elementName}" is not a valid svg element. To ignore warning {...}`);
                        }

                        /**
                         * Log if the element is deprecated.
                         */
                        if (isSVGElementDeprecated) {
                              bc.warn(`"${elementName}" is a deprecated svg element. To ignore warning {...}`);
                        }

                        return [element, element.toString() !== "[object SVGElement]", undefined];
                  }
            } else {
                  bc.error("elementName is not a string or is empty.");
                  return [undefined, undefined, "elementName is not a string or is empty."];
            }
      }

      /**
       * 
       * @param {string | function} element The name of the element or the component.
       * @param {object} attribute Attributes of the element or the component.
       * @param  {...any} children The children of the element or the component.
       * 
       * @if {element is function} run it and get the element.
       * @process {add attribute}
       * @process {add children} for Component add it into the attribute.
       * 
       * @returns {HTMLElement} With the attributes and children.
       */
      createElement(element, attribute, ...children) {
            if (typeof element === "string") {

                  /**
                   * @param {HTMLElement} p The parent HTMLNode.
                   * @process convert element name into lowrcase.
                   * @process Create Parent Element.
                   */
                  const [p, isValidElement, error] = this.#test_tag(element.toLowerCase());

                  /**
                   * Add some basic attributes.
                   */
                  p.setAttribute("data-xeon-element", p.toString());
                  p.setAttribute("dir", "auto");

                  /**
                   * @condition Attribut must be given, and it must be an object.
                   */
                  if (attribute && typeof attribute === "object") {
                        Object.keys(attribute).forEach((key) => {
                              // Format Keys
                              // key = key.replace(this.#CAMELIZE, this.#capitalize);
                              const isNamespace = this.#CAMELIZE.test(key);
                              if (isNamespace && p instanceof SVGElement) {
                                    // console.log(isNamespace);
                                    p.setAttributeNS(null, key, attribute[key]);
                                    return;
                              }
                              /**
                               * @condition attribute is style ? It must be an Object.
                               */
                              if (key.toLowerCase() === 'style') {
                                    if (typeof attribute[key] === 'object')
                                          Object.keys(attribute[key]).forEach((attr) => {
                                                if (typeof attribute[key][attr] === 'string')
                                                      p.style[attr] = attribute[key][attr];
                                                else if (typeof attribute[key][attr] === 'number')
                                                      p.style[attr] = attribute[key][attr] + 'px';
                                          });
                                    else
                                          bc.error('Inline styles must be in Object format.');
                              } else if (key.toLowerCase() === 'ref') {
                                    if (typeof attribute[key] === 'object' && attribute[key].refNum) {
                                          this.updateRef(attribute[key].refNum, p);
                                    } else bc.error(`Didn't get a valid reference in ${element}`);
                              } else {
                                    /**
                                     * @condition If attribute's key is string. Simply add this.
                                     */
                                    if (typeof attribute[key] === 'string') {

                                          /**
                                           * @condition the element is image element.
                                           * element will be visible after the image loaded.
                                           */
                                          if (element.toLowerCase() === "img") {
                                                if (key.toLowerCase() === "src") {
                                                      var img = new Image();

                                                      img.onload = function () {
                                                            p.src = img.src;
                                                      };

                                                      let wait = setInterval(function () {
                                                            let w = img.naturalWidth,
                                                                  h = img.naturalHeight;
                                                            if (w && h) {
                                                                  clearInterval(wait);
                                                                  p.style.aspectRatio = w / h;
                                                            }
                                                      }, 30);

                                                      img.src = attribute[key];

                                                } else if (key.toLowerCase() === "classname") {
                                                      p.className = attribute[key];
                                                } else {
                                                      p.setAttribute(key.toLowerCase(), attribute[key])
                                                }

                                          } else if (key.toLowerCase() === "classname") {
                                                p.class = attribute[key];
                                          } else {
                                                p.setAttribute(key.toLowerCase(), attribute[key])
                                          }

                                    }
                                    if (typeof attribute[key] === 'number') {
                                          p.setAttribute(key.toLowerCase(), attribute[key])
                                    }
                                    /**
                                     * @condition If attribute's key is a function. then it must be an event.
                                     * @process add the event like "element.onclick"
                                     */
                                    if (typeof attribute[key] === 'function') {
                                          p[key.toLowerCase()] = attribute[key];
                                    }
                                    else {
                                          p.setAttribute(key.toLowerCase(), attribute[key]?.toString())
                                    }
                              }
                        })
                  } else {
                        // If attribute is not an object.
                        if (!attribute) bc.error('You must provide attribute for each element. Give at least an empty object.');
                        else bc.error("Attribute Must be an object");
                  }

                  /**
                   * Children will always be an Array as it is a args. If nothing is provided as child there will be an empty array.
                   * Add each child one by one.
                   * Creating function for that it could be exicuted repitedly.
                   * 
                   * @param {string | number | HTMLElement | function | Array} child Children of the element
                   */
                  function addEachChild(child) {

                        if (child !== undefined || null) {

                              /**
                               * @Condition Child Element is string.
                               * Create Text Node and append.
                               */
                              if (typeof child === 'string' || typeof child === 'number') {
                                    p.appendChild(document.createTextNode(child))
                              }

                              /**
                               * @Condition Child Element is HTMLElement.
                               * append.
                               */
                              else if (child.nodeType >= 1 && child.nodeType <= 11) {
                                    p.appendChild(child)
                              }

                              else if (typeof child === "object") {
                                    /**
                                     * @Condition Child Element is an Array.
                                     * run addChildren function with parametere of child.
                                     */
                                    if (Array.isArray(child)) {
                                          addChildren(child);
                                    } else {
                                          const childElement = this.XSET(child);
                                          if (childElement && childElement.nodeType >= 1 && childElement.nodeType <= 11) {
                                                p.appendChild(childElement);
                                          } else {
                                                bc.error("Child Element is not a valid element", childElement);
                                          }
                                    }
                              }
                              else if (typeof child === "boolean" && child === false) {}
                              else {
                                    bc.error(`Invalid child : Expect a HTMLNode or String. But found a ${typeof child}. \n>>>==============>>> Unwillingly ignoring it.`);
                              }
                        }
                  }

                  addEachChild = addEachChild.bind(this)

                  /**
                   * 
                   * @param {Array} children Array of child.
                   */
                  function addChildren(children) {
                        children.forEach((child) => {
                              addEachChild(child);
                        })
                  }

                  /**
                   * as the children params is a args, it must be an array,
                   * run the addChildren function with the parametere of children.
                   */
                  addChildren.bind(this)(children);

                  /**
                   * @returns {HTMLElement}
                   */
                  return p;
            } else {

                  /**
                   * Component
                   * 
                   * @if element is function or class, it will be an component.
                   * run the #createComponent function.
                   * @returns {HTMLElement}
                   */
                  let c = this.#createComponent(element, attribute, children, !this.#editMode, this.#currentComponentNumber + 1);
                  if (Array.isArray(c)) {
                        // let fragment = document.createDocumentFragment();
                        let fragment = new DocumentFragment();
                        c.forEach(elem => {
                              fragment.appendChild(elem);
                        })
                        return fragment;
                  } else {
                        return c;
                  }
            }
      };

      /**
       * 
       * @param {function} component - Function or Class based component
       * @param {object} attribute - object of attribute
       * @param {Array} children - Array of children
       * @param {Boolean} fresh - Either the component is fresh or not.
       * @param {Number} componentNumber - the serial number of the component.
       * @returns {HTMLElement}
       */
      #createComponent(component, attribute, children, fresh, componentNumber) {

            /**
             * There will be two types of component. Fresh Component & reRendered component.
             * 
             * @condition attribute is object. continue
             */
            if (attribute && typeof attribute === "object") {

                  /** @condition fresh = true : the component is new, so the editMode will be false. */
                  fresh ? this.#editMode = false : this.#editMode = true

                  /** @condition fresh = true : the component is to be created, so create a new componntNumber. */
                  if (fresh) {
                        this.#totalComponentNumber++;
                        let keys = Array.from(this.#elements.keys());
                        componentNumber = keys[keys.length - 1] + 1;
                        if (isNaN(componentNumber) && this.#totalComponentNumber === 0) {
                              componentNumber = 1;
                        } else {
                              componentNumber = this.#totalComponentNumber;
                        }
                  }
                  this.#currentComponentNumber = componentNumber;

                  /**
                   * @condition component is class based, process it like a class.
                   */
                  var p, clearInitFunction, DOMObserver, staticXeon = this;
                  if (!this.#isClass(component)) {
                        /** @process run the component and store the returned HTMLElement */
                        p = component({ ...attribute, children, componentNumber });

                        var functionalOnInit = this.#functionalOnInit;
                        this.#functionalOnInit = null;
                  
                        p = this.XSET(p);

                        if (typeof functionalOnInit === "function") {
                              this.#observeDOM(document, (mutations, observer) => {

                                    mutations.forEach(function (mutation) {
                                          var addedNodes = Array.from(mutation.addedNodes);
                                          var removedNodes = Array.from(mutation.removedNodes);

                                          if (p.nodeType >= 1 && p.nodeType <= 11) {
                                                var isAddedNodes = addedNodes.indexOf(p) > -1;
                                                var isNodeAddedByParent = addedNodes.some(parent => parent.contains(p));
                                                var isRemovedNodes = removedNodes.indexOf(p) > -1;
                                                var isNodeRemovedByParent = removedNodes.some(parent => parent.contains(p));

                                                // console.log(p);
                                                // console.table({ isAddedNodes, isNodeAddedByParent, isRemovedNodes, isNodeRemovedByParent });

                                                if (isAddedNodes | isNodeAddedByParent) {
                                                      clearInitFunction = functionalOnInit();
                                                      DOMObserver = observer;
                                                      saveComponent();
                                                } else if (isRemovedNodes | isNodeRemovedByParent) {
                                                      if (typeof clearInitFunction === "function") {
                                                            clearInitFunction();
                                                      }
                                                      observer.disconnect();
                                                }
                                          }
                                    });

                              })
                        } else {
                              saveComponent();
                        }
                  } else {
                        const classComponent = new component({ ...attribute, children, componentNumber });
                        p = classComponent.render();
                        p = this.XSET(p);

                        if (typeof classComponent.onInit === "function") {
                              this.#observeDOM(document, (mutations, observer) => {

                                    mutations.forEach(function (mutation) {
                                          var addedNodes = Array.from(mutation.addedNodes);
                                          var removedNodes = Array.from(mutation.removedNodes);

                                          if (p.nodeType >= 1 && p.nodeType <= 11) {
                                                var isAddedNodes = addedNodes.indexOf(p) > -1;
                                                var isNodeAddedByParent = addedNodes.some(parent => parent.contains(p));
                                                var isRemovedNodes = removedNodes.indexOf(p) > -1;
                                                var isNodeRemovedByParent = removedNodes.some(parent => parent.contains(p));

                                                // console.log(p.children);
                                                // console.table({ isAddedNodes, isNodeAddedByParent, isRemovedNodes, isNodeRemovedByParent });

                                                if (isAddedNodes | isNodeAddedByParent) {
                                                      clearInitFunction = classComponent.onInit();
                                                      DOMObserver = observer;
                                                      saveComponent();
                                                } else if (isRemovedNodes | isNodeRemovedByParent) {
                                                      if (typeof clearInitFunction === "function") {
                                                            clearInitFunction();
                                                      }
                                                      observer.disconnect();
                                                }
                                          }
                                    });

                              })
                        } else {
                              saveComponent();
                        }
                  }

                  function saveComponent() {
                        /** @global {object} currentComponent */
                        staticXeon.#currentComponent = {
                              node: p,
                              component,
                              attribute,
                              children,
                              clearInitFunction,
                              DOMObserver
                        }

                        /** Either store new component or replace old component with new one. */
                        staticXeon.#elements.set(componentNumber, staticXeon.#currentComponent);
                  }


                  /** testing */
                  // console.log(this.#elements);

                  /**
                   * Run the onload function.
                   */

                  return p;
            } else {
                  // If there is no attribute or it is undefind/null.
                  bc.error('You must provide attribute for each element. Give at least an empty object.');
            }
      }

      /**
       * reRender a component.
       * 
       * @param {Number} componentNumber - serial Number of component to be reRender.
       */
      reRender(componentNumber) {

            // console.time("re-render");
            const component = this.#elements.get(componentNumber);
            if (component) {
                  const newComponentNode = this.#createComponent(component.component, component.attribute, component.children, false, componentNumber);
                  const parentNode = component.node.parentNode;
                  // console.time('elementChange');
                  parentNode.replaceChild(newComponentNode, component.node);
                  // console.timeEnd('elementChange');
                  // console.timeEnd("re-render");
            } else {
                  bc.error(`XEON.reRender method can't be called before XEON.createComponent method is done.`);
                  bc.error(`Component with serial number ${componentNumber} is not found.`);
            }

      }


      /**
       * XSET Create element function
       * 
       * @param {String | Function} elementName 
       * @param {Object | String} entries 
       * @returns { HTMLElement } - xeon element
       */
      #XSETCreateElement(elementName, entries) {
            if (typeof entries === "object" && !Array.isArray(entries)) {
                  let children = [];
                  const { name: name, children: child, text: text, ...attributes } = entries;
                  if (child) {
                        for (const [key, value] of Object.entries(child)) {
                              children.push(this.#XSETCreateElement(key, value));
                        }
                  }
                  if (text && (typeof text === "string" | typeof text === "number")) {
                        children.push(text);
                  }
                  if (elementName.toLowerCase() === "component") {
                        return this.createElement(name, { ...attributes, text }, ...children);
                  } else {
                        return this.createElement(elementName, { ...attributes, name }, ...children);
                  }
            } else {
                  if (typeof entries === "string") {
                        return entries;
                  }
            }
      }

      /**
       * XEON-Stack-Element-Tree
       * 
       * convert an object tree into xeon component.
       * 
       * @param {Object} params - an object including all element trees
       * @returns { HTMLElement } - xeon element
       */
      XSET(params) {
            if (typeof params === "object" && !Array.isArray(params)) {
                  if (Object.keys(params).length <= 0) {
                        throw new SyntaxError("xeon.XSET function requires an object with atleast one entry. But no entry found.");
                  } else {
                        const elementName = params.name,
                              attributes = params.props?.attributes,
                              children = params.props?.children;

                        if (elementName && (typeof elementName === "string" || typeof elementName === "function") && (typeof attributes === "object" || attributes === null) && ((typeof children === "object" && Array.isArray(children)) || children === null)) {
                              const elment = this.createElement(elementName, attributes, ...children);
                              return elment;
                        }
                  }
            } else {
                  /**
                   * show error
                   */
                  bc.error("xeon.XSET function requires an object. But found " + typeof params);
            }
      }

      /**
       * @description - Get the running script path.
       * 
       * @returns {String}
       */
      getRunningScript = () => {
            const error = new Error();
            const match = error.stack.match(/([^ \n\(@])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig);
            return decodeURI(match[match.length - 1]);
      }

      /**
       * @description - create CSS
       * @async
       * 
       * @param {String} css - path of css. 
       */
      async createCSSAsync(css) {
            const JSURI = this.getRunningScript();

            const response = await fetch(JSURI + "/../" + css, {
                  method: 'GET',
                  headers: {
                        'Content-Type': 'text/css'
                  },
            });
            const cssText = await response.text();

            const style = document.createElement('style');
            style.type = 'text/css';
            const textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
            document.head.appendChild(style);
      }

      /**
       * @description - create css module.
       * @deprecated
       * 
       * @param {String} css - path of css
       * @returns {Object}
       */
      createCSSModule(css) {
            bc.depricated.warn(`XEON.createCSSModule uses Synchronus XMLHttpRequest, which may affect the user experience as untill the function is done, no further script will be executed.`);
            const JSURI = this.getRunningScript();

            var xhr = new XMLHttpRequest();
            xhr.open("GET", JSURI + "/../" + css, false);  // synchronous request
            xhr.send(null);
            var cssText = xhr.responseText;

            var className = {};
            let filename = (css.split("/").pop()).split(".")[0];
            let salt = Math.random().toString(36).substring(2, 15);
            let cssTextFormated = cssText.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "").replace(/\s{2,}/g, " ").replace(/\.(\w+)/g, (match, p1) => {
                  className[p1] = filename + "-" + p1 + "-" + salt;
                  return "." + className[p1];
            });

            const style = document.createElement('style');
            style.type = 'text/css';
            const textNode = document.createTextNode(cssTextFormated);
            style.appendChild(textNode);
            document.head.appendChild(style);
            return className;
      }

      /**
       * @description - create css from string
       * 
       * @param {String} cssText - css code in string
       */
      create_css_from_utf_8(cssText) {
            const style = document.createElement('style');
            style.type = 'text/css';
            const textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
            document.head.appendChild(style);
      }

      /**
       * @description - create css module from string
       * 
       * @param {String} fileName - css file name in string
       * @param {String} cssText - css code in string
       */
      create_module_css_from_utf_8(fileName, cssText) {

            var className = {};
            let salt = Math.random().toString(36).substring(2, 15);
            let cssTextFormated = cssText.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "").replace(/\s{2,}/g, " ").replace(/\.(\w+)/g, (match, p1) => {
                  className[p1] = fileName + "-" + p1 + "-" + salt;
                  return "." + className[p1];
            });

            const style = document.createElement('style');
            style.type = 'text/css';
            const textNode = document.createTextNode(cssTextFormated);
            style.appendChild(textNode);
            document.head.appendChild(style);
            return className;
      }

      /**
       * @description - create array of unique id.
       * 
       * @param {} func 
       */
      uuid(id, dev) {
            var _uuid = {};

            function uuidv4() {
                  return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c =>
                        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                  );
            }

            function uuidv3() {
                  return ([1e7] + 1e3).replace(/[018]/g, c =>
                        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                  );
            }

            id.forEach(_id => {
                  _uuid[_id] = `${_id}_${dev ? uuidv3() : uuidv4()}`;
            });

            return _uuid;
      }

      /**
       * initializetion function of functional component.
       * 
       * @param {function} func 
       */
      onInit(func) {
            this.#functionalOnInit = func;
      }

      useState(initialState) {

            const setState = updatedState => {
                  console.log(updatedState);
            }

            return [initialState, setState]
      }

      createRef(initialValue) {
            this.#totalReferenceNumber++;
            this.#reference.set(this.#totalReferenceNumber, {
                  refNum: this.#totalReferenceNumber,
                  initialValue,
                  current: initialValue
            });
            return ({
                  refNum: this.#totalReferenceNumber,
                  initialValue,
                  current: initialValue
            });
      }

      updateRef(refNum, current) {
            const ref = this.#reference.get(refNum);
            this.#reference.set(refNum, { ...ref, current });
            // console.log(this.#reference);
      }


      /**
       * @description - Link component, navigate through app.
       * 
       * @param {Object} props - basic xeon component Properties.
       * @returns 
       */
      Link(props) {
            const { children, componentNumber, ...attributes } = props;
            return {
                  name: "a",
                  props: {
                        attributes: {
                              href: props.to || props.href,
                              onclick: e => {
                                    e.preventDefault();
                                    this.navigateTo(props.to || props.href);
                              },
                              ...attributes
                        },
                        children: [children]
                  }
            }
      }

}


/**
 * Xeon JS Class component Extender.
 */
export const xeonComponent = class {
      constructor(props) {
            this.props = props;
      }

      setTitle(title) {
            document.title = title;
      }

      setIcon(file) {
            document.querySelector("link[rel='shortcut icon']").href = file;
      }

      onInit(element) {
            return (element) => { }
      }

      render() {
            return "";
      }
}


/**
 * @global {class} xeon - new xeon class.
 * @exports default xeon.
 * 
 * @exports others seperately.
 */
xeon = new xeon();
window.xeon = xeon;


HTMLElement.prototype.update = function (xset) {
      this.clear();
      this.appendChild(xeon.XSET(xset));
}

/**
 * @Event OnBackPress
 */
const popStateFunction = e => {
      e.preventDefault();
      xeon.config(xeon.dom, xeon.root);
}
window.removeEventListener("popstate", popStateFunction);
window.addEventListener("popstate", popStateFunction);

export default xeon;
export const onInit = xeon.onInit;
export const XSET = xeon.XSET;
export const useState = xeon.useState;
export const reRender = xeon.reRender;
export const navigateTo = xeon.navigateTo;
export const theme = xeon.theme;
export const uuid = xeon.uuid;
export const Link = xeon.Link;