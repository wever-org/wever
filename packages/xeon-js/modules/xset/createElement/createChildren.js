import chalk from "../../utils/chalk";
import XSET from "../";


export default function createChildren(element, children) {

      /**
       * Test all the parametere.
       */
      if (!element || !(element.nodeType)) {
            chalk.error(`Invalid element : Expect a HTMLElement. But found a ${typeof element}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      if (!Array.isArray(children)) {
            chalk.error(`Invalid children : Expect a Array. But found a ${typeof children}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
       * Add children to the element.
       */
      for (let child of children) {

            if (child?.nodeType) {
                  element.appendChild(child);
            }
            else if (typeof child === "string") {
                  element.appendChild(document.createTextNode(child));
            }
            else if (typeof child === "number") {
                  element.appendChild(document.createTextNode(child.toString()));
            }
            else if (typeof child === "function") {
                  element.appendChild(child());
            }
            else if (Array.isArray(child)) {
                  createChildren(element, child);
            }
            else if (typeof child === "object") {
                  const childElement = XSET(child, element);
                  if (childElement) element.appendChild(childElement);
            }
            else {
                  chalk.warn(`Invalid child : Expect a HTMLElement, String, Function, Array or Object. But found a ${typeof child}. \n>>>==============>>> Unwillingly ignoring it.`);
                  // element.appendChild(document.createTextNode(typeof child));
            }

      }

}