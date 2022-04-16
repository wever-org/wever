import chalk from "../../utils/chalk";
import createStyle from "./helper/createStyle";

export default function createAttribute(element, attributes) {

      /**
       * Test all the parametere.
       */
      if (!element || !(element.nodeType)) {
            chalk.error(`Invalid element : Expect a HTMLElement. But found a ${typeof element}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      if (!attributes || typeof attributes !== "object" || Array.isArray(attributes)) {
            chalk.error(`Invalid attributes : Expect a Object. But found a ${typeof attributes}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
       * Add attributes to the element.
       */
      for (let [key, value] of Object.entries(attributes)) {
            key = key.toLowerCase();

            if (typeof value === "string") {
                  if (key === "class" || key === "className") {
                        // element.className = value;
                        element.setAttribute("class", value);
                  }
                  else if (key === "style") {
                        chalk.warn(`It is recomanded to use an [typeof Object] instade of a [typeof String] for the "style" attribute.`)
                        element.style.cssText = value;
                  }
                  else {
                        element.setAttribute(key, value);
                  }
            }
            else if (typeof value === "function") {
                  if (key.includes("on")) {
                        element.addEventListener(key.slice(2), value);
                  } else {
                        element.addEventListener(key, value);
                  }
            }
            else if (typeof value === "object") {
                  if (key === "style") {
                        createStyle(element, value);
                  }
                  else {
                        element.setAttribute(key, JSON.stringify(value));
                  }
            }

      }

}
