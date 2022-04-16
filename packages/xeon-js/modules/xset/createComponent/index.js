
import XSET from "..";
import { isClass } from "./helper/tools";
import xeon from "../../xeon";
import chalk from "../../utils/chalk";

export default (func, attributes, children, element) => {
      var _newComponent = null;
      
      // Test all the parametere.
      if (typeof func !== "function") {
            chalk.error(`Invalid object : Expect a function. But found a ${typeof func}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      if (!isClass(func)) {

            const newXSETObject = func({
                  ...attributes,
                  children,
                  self: xeon.selfObject,
            });

            _newComponent = XSET(newXSETObject, element);

      } else {

      }

      return _newComponent;

}