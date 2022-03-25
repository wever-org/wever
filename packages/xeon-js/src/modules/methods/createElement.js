
// import { camalizeString } from "../utils/string";
import chalk from "../utils/chalk";
import ElemList from "./real_element";


/**
 * @method testElement
 * 
 * @param {string} elm_name 
 */
function testElement(elm_name, parent) {
      /**
       * check if element name is valid.
       */
      if (elm_name && typeof elm_name === "string" && elm_name !== "") {

            /**
             * Test the element if SVG or Deprecated SVG Element.
             */
            var isSVGElement = ElemList.SVG_ELEMENTS.indexOf(elm_name.toLowerCase()) >= 0;
            var isSVGElementDeprecated = ElemList.SVG_DEPRECATED_ELEMENTS.indexOf(elm_name.toLowerCase()) >= 0;

            if (isSVGElement && elm_name.toLowerCase() === "svg") {
                  const element = document.createElementNS("http://www.w3.org/2000/svg", elm_name.toLowerCase());
                  /**
                   * Log If not a valid svg element.
                   */
                  if (element.toString() === "[object SVGElement]") {
                        chalk.warn(`"${elm_name}" is not a valid svg element. To ignore warning {...}`);
                  }
                  return [element, element.toString() !== "[object SVGElement]", true, undefined];
            }

            if (parent instanceof SVGElement) {
                  /**
                   * If parent is a svg element.
                   */
                  if (isSVGElement) {
                        /**
                         * If element is SVG Element,
                         */
                        const element = document.createElementNS("http://www.w3.org/2000/svg", elm_name.toLowerCase());
                        /**
                         * Log If not a valid svg element.
                         */
                        if (element.toString() === "[object SVGElement]") {
                              chalk.warn(`"${elm_name}" is not a valid svg element. To ignore warning {...}`);
                        }
                        return [element, element.toString() !== "[object SVGElement]", true, undefined];
                  }

                  if (isSVGElementDeprecated) {
                        /**
                         * If element is Deprecated SVG Element,
                         */
                        /**
                         * Log if the element is deprecated.
                         */
                        chalk.warn(`"${elm_name}" is a deprecated svg element. To ignore warning {...}`);

                        const element = document.createElementNS("http://www.w3.org/2000/svg", elm_name.toLowerCase());
                        /**
                         * Log If not a valid svg element.
                         */
                        if (element.toString() === "[object SVGElement]") {
                              chalk.warn(`"${elm_name}" is not a valid svg element. To ignore warning {...}`);
                        }
                        return [element, element.toString() !== "[object SVGElement]", true, undefined];
                  }
            }

            if (!(isSVGElement && isSVGElementDeprecated) && !(parent instanceof SVGElement)) {
                  /**
                   * If element is not SVG or Deprecated SVG Element,
                   * Create normal element.
                   */
                  console.time("createElement");
                  const element = document.createElement(elm_name.toUpperCase());
                  console.timeEnd("createElement");
                  /**
                   * Log If not a valid html element.
                   */
                  if (element.toString() === "[object HTMLUnknownElement]") {
                        chalk.warn(`"${elm_name}" is not a valid html element. To ignore warning {...}`);
                  }
                  return [element, element.toString() !== "[object HTMLUnknownElement]", false, undefined];
            }

      } else {
            chalk.error("elementName is not a string or is empty.");
            return [undefined, undefined, "elementName is not a string or is empty."];
      }

}


/**
 * @method setAttributes
 * 
 * @param {HTMLElement|SVGElement} element 
 * @param {Object} attributes 
 */
async function setAttributes(element, attributes) {
      /**
       * check if element is svg or not.
       */
      const isSVGElement = element instanceof SVGElement;

      if (attributes && typeof attributes === "object" && !Array.isArray(attributes)) {

            const attrEntries = Object.entries(attributes);

            for (let i = 0; i < attrEntries.length; i++) {
                  const [key, value] = attrEntries[i];
                  
                  if (isSVGElement) {
                        /**
                         * If element is svg element,
                         */
                        element.setAttributeNS("http://www.w3.org/2000/svg", key, value);
                  } else {
                        /**
                         * If element is not svg element,
                         */
                        if (key.toLowerCase() === "style") {
                              /**
                               * If attribute is style,
                               */
                              if (typeof value === "object" && !Array.isArray(value)) {
                                    /**
                                     * If value is object,
                                     */
                                    Object.entries(value).map(([key, value]) => {
                                          if (typeof value === "string") {
                                                element.style[key] = value;
                                          }
                                          else if (typeof value === "number") {
                                                element.style[key] = value + "px";
                                          }
                                    });
                              } else {
                                    /**
                                     * If value is not object,
                                     */
                                    chalk.error('Inline styles must be in Object format.');
                              }
                        }
                        else if (typeof value === "string") {
                              /**
                               * If Value is string.
                               */
                              /**
                               * @condition the element is image element.
                               * element will be visible after the image loaded.
                               */
                              if (key.toLowerCase() === "img") {
                                    if (key.toLowerCase() === "src") {
                                          var img = new Image();

                                          img.onload = function () {
                                                element.src = img.src;
                                          };

                                          let wait = setInterval(function () {
                                                let w = img.naturalWidth,
                                                      h = img.naturalHeight;
                                                if (w && h) {
                                                      clearInterval(wait);
                                                      element.style.aspectRatio = w / h;
                                                }
                                          }, 30);

                                          img.src = value;

                                    } else if (key.toLowerCase() === "classname") {
                                          element.class = value;
                                    } else {
                                          element.setAttribute(key.toLowerCase(), value);
                                    }
                              } else if (key.toLowerCase() === "classname") {
                                    element.class = value;
                              } else {
                                    element.setAttribute(key.toLowerCase(), value);
                              }
                        }

                        /**
                         * if value is a number.
                         */
                        else if (typeof value === 'number') {
                              element.setAttribute(key.toLowerCase(), value);
                        }
                        /**
                         * @condition If attribute's key is a function. then it must be an event.
                         * @process add the event like "element.onclick"
                         */
                        else if (typeof value === 'function') {
                              element[key.toLowerCase()] = value;
                        }
                        else {
                              element.setAttribute(key.toLowerCase(), value?.toString())
                        }
                  }
            };
      }
}


/**
 * @method appendChildren
 * 
 * @param {HTMLElement} element 
 * @param {Array} children 
 */
async function appendChildren(element, children) {
      const isSVGElement = element instanceof SVGElement;

      if (Array.isArray(children)) {
            /**
             * If children is typeof Array.
             */
            if (!isSVGElement) {
                  /**
                   * If not svg element.
                   */
                  for (let i = 0; i < children.length; i++) {
                        const child = children[i];
                        /**
                         * @Condition Child Element is string.
                         * Create Text Node and append.
                         */
                        if (typeof child === "string" || typeof child === "number") {
                              element.appendChild(document.createTextNode(child));
                        }
                        else if (typeof child === "object") {
                              /**
                               * @Condition Child Element is an Array.
                               * run addChildren function with parametere of child.
                               */
                              if (Array.isArray(child)) {
                                    appendChildren(element, child);
                              }
                        }
                        /**
                         * @Condition Child Element is HTMLElement.
                         * append.
                         */
                        else if (child.nodeType >= 1 && child.nodeType <= 11) {
                              element.appendChild(child);
                        }
                        else if (typeof child === "boolean" && child === false) { }
                        else {
                              chalk.error(`Invalid child : Expect a HTMLNode or String. But found a ${typeof child}. \n>>>==============>>> Unwillingly ignoring it.`);
                        }
                  };
            }
      }
}


/**
 * @method createElement
 * 
 * @param {string|Function} elm_name
 * @param {null|undefined|object} attributes
 * @param {null|undefined|Array} children
 */
function createElement(elm_name, attributes, children, parent) {
      var element;

      if (typeof elm_name === "string") {
            console.time("element: ");
            const testedElement = testElement(elm_name.toLowerCase(), parent);
            console.timeEnd("element: ");
            
            if (testedElement[0]) {
                  element = testedElement[0];

                  console.time("attribute: ");
                  setAttributes(element, attributes);
                  console.timeEnd("attribute: ");

                  console.time("children: ");
                  appendChildren(element, children);
                  console.timeEnd("children: ");
            }

      }

      return element;
}

export default createElement;