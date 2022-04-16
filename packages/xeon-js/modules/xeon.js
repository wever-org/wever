
import autoBind from "./utils/auto-bind";
import chalk from "./utils/chalk";

Function.prototype.async = function () {
      setTimeout.bind(null, this, 0).apply(null, arguments);
};

/**
 * Import methodes.
 */
import * as elementManager from "./utils/elementsManager";
import { formatQuery } from "./utils/tools";
import XSET from "./xset";

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
      #option = {
            isRouterEnabled: false,
            willUpdateOnThemeChange: false,
      };
      #matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");

      constructor() {
            autoBind(this);

            this.selfObject = {
                  theme: {
                        dark: this.#matchMediaDark.matches,
                        light: !this.#matchMediaDark.matches,
                        onChange: this.#matchMediaDark.onchange,
                  },
                  router: {
                        isEnabled: this.#option.isRouterEnabled,

                        history: window.history,
                        // Location.
                        location: window.location,
                        hash: window.location.hash,
                        host: window.location.host,
                        hostname: window.location.hostname,
                        href: window.location.href,
                        origin: window.location.origin,
                        pathname: window.location.pathname,
                        port: window.location.port,
                        protocol: window.location.protocol,
                        search: window.location.search,
                        query: formatQuery(window.location.search),

                        onChange: window.onpopstate,
                        match: {},
                  }
            }

            this.configure = this.config;
            this.initialize = this.init;
            this.XSET = XSET;
      }

      /**
       * @method config - configures the xeon instance.
       * 
       * @param {Object|Array|HTMLElement|Function} dom 
       * @param {HTMLElement|String} root 
       */
      config(dom, root, option) {
            this.#option = { ...this.#option, ...option };
      }

      init() {
            this.#root.appendChild(this.#dom);
      }

}

xeon = new xeon();
window.xeon = xeon;

export default xeon;