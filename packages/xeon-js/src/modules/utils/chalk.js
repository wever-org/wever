/**
 * @file The custom console file.
 * 
 * @copyright noCopyright 2021-present, ChatCord, Inc.
 * This source code is licensed under the MIT license found in the
 * @license file in the root directory of this source tree.
 * 
 * @author CodeWithArif
 */
"use strict";

var isLog = true;

const chalk = {

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

/**
 * @global {class} browerConsole = new browserConsole
 * @exports browerConsole
 */
// browserConsole = new browserConsole();

export default chalk;