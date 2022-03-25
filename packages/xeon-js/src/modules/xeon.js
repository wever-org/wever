
import autoBind from "./utils/auto-bind";
import _typeof from "./utils/typeof";
import chalk from "./utils/chalk";

/**
 * Import methodes.
 */
import createElement from "./methods/createElement";

/**
 * @class xeon - main constructor.
 */
class xeon {
      _this = this;

      /**
       * @define all private variables.
       */
      #root = null;
      #dom = null;
      #isRouterEnabled = false;

      constructor() {
            autoBind(this);

            this.configure = this.config;
            this.initialize = this.init;
            this.createElement = createElement;
      }

      /**
       * @method config - configures the xeon instance.
       * 
       * @param {Object|Array|HTMLElement|Function} dom 
       * @param {HTMLElement|String} root 
       */
      config(dom, root) {
            /**
             * Valid the values.
             */
            const domValidity = _typeof(dom, "object", "array", "function", "HTMLElement");
            const rootValidity = _typeof(root, "HTMLElement", "string");
            if (domValidity[3] === true)
                  chalk.error("The dom parameter must be an object, array, function or HTMLElement.");
            if (rootValidity[3] === true)
                  chalk.error("The root parameter must be an HTMLElement or string.");

            /**
             * @process set dom and root.
             */
            if (domValidity[3] === false) {
                  this.#dom = dom;
            }

            if (rootValidity[1].string) {
                  this.#root = document.querySelector(root);
            }
            else if (rootValidity[1].HTMLElement) {
                  this.#root = root;
            }
      }

      init() {
            this.#root.appendChild(this.#dom);
      }
}

xeon = new xeon();
window.xeon = xeon;

export default xeon;