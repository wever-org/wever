import createComponent from "./createComponent";
import chalk from "../utils/chalk";
import createElement from "./createElement";

/**
 * @function XSET - convert an object to a DOM element.
 * @description XSET is a function that converts an object to a DOM element.
 * 
 * @param {Object} obj - The XSET Object(Imaginary Virtual DOM) | This will later convert into the do element.
 * @param {HTMLElement} element - The parent element, where the do element will be appended. (Not Necessory)
 *                                If provided and the parent is not a HTMLElement, then the children will be created with the prent Namespace.
 * @returns 
 */
export default function XSET(obj, element) {

      /**
       * Test all the parametere.
       */
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
            chalk.error(`Invalid object : Expect a Object. But found a ${typeof obj}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
       * Create the element.
       */
      var newElement = null;
      const element_name = obj.name || "div";
      const attributes = obj.props.attributes || {};
      const children = obj.props.children || [];

      if (typeof element_name === "string") {

            newElement = createElement(element_name, attributes, children, element);

      }
      else if (typeof element_name === "function") {

            newElement = createComponent(element_name, attributes, children, element);

      }

      return newElement;

}

/**
 * 
 * @param {String|Function|Class} element_name 
 * @param {Object} attributes 
 * @param {Array} children 
 * @returns 
 */
export function createXSETObject(element_name, attributes, ...children) {

      const obj = {
            name: element_name,
            props: {
                  attributes: attributes,
                  children: children
            }
      };

      return obj;

}