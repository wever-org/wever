
// import { camalizeString } from "../utils/string";
import chalk from "../../utils/chalk";
import createRealElement from "./helper/real_element";
import createAttribute from "./createAttribute";
import createChildren from "./createChildren";
import createComponent from "../createComponent";

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
const dom = window.document;

/**
 * @method createElement
 * 
 * @param {string|Function} elm_name
 * @param {null|undefined|object} attributes
 * @param {null|undefined|Array} children
 */
function createElement(elm_name, attributes, children, parent) {
      var element;
      window.TOTAL_NUMBERS_OF_ELEMENTS = ++window.TOTAL_NUMBERS_OF_ELEMENTS || 1;

      /**
       * Test all the parametere.
       */
      if (typeof elm_name !== "string") {
            chalk.error(`Invalid element name : Expect a String. But found a ${typeof elm_name}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }
      if (!attributes || typeof attributes !== "object" || Array.isArray(attributes)) {
            chalk.error(`Invalid attributes : Expect a Object. But found a ${typeof attributes}. \n>>>==============>>> Unwillingly ignoring it.`);
      }
      if (!Array.isArray(children)) {
            chalk.error(`Invalid children : Expect a Array. But found a ${typeof children}. \n>>>==============>>> Unwillingly ignoring it.`);
      }
      if (parent && !(parent.nodeType)) {
            chalk.error(`Invalid parent : Expect a HTMLElement. But found a ${typeof parent}. \n>>>==============>>> Unwillingly ignoring it.`);
      }

      /**
       * Create the element.
       */
      if (typeof elm_name === "string") {

            if (elm_name.toLowerCase() === "fragment") {
                  if (canUseDOM) {
                        element = dom.createDocumentFragment();
                        element.namespaceURI = "http://www.w3.org/1999/xhtml";
                  }
            } else {
                  element = createRealElement(elm_name, parent);
            }

      }

      /**
       * Add attributes to the element.
       */
      createAttribute(element, attributes);

      /**
       * Add children to the element.
       */
      createChildren(element, children);

      return element;

}


export default createElement;