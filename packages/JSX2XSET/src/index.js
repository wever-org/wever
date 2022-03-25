const jsx = require("@babel/plugin-syntax-jsx").default;
const { declare } = require("@babel/helper-plugin-utils");
const t = require("@babel/core").types;

/**
 * Import Modules.
 */
const modules = require("./modules");


module.exports = declare((api, options) => {

      const visitor = {
            JSXElement: {
                  exit(path, file) {
                        path.replaceWith(modules.createJSXElement(path, file));
                  }
            },
            JSXFragment: {
                  exit(path, file) {
                        path.replaceWith(modules.createJSXElement(path, file, true));
                  }
            },
            JSXNamespacedName(path, state) {
                  throw path.buildCodeFrameError(`Namespace tags are not supported by Wever's JSX.`);
            }
      };



      return {
            name: "transform-react-jsx",
            inherits: jsx,
            visitor,
      };
});