/**
 * Copyright (c) 2021-present, ChatCord, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

console.clear();
console.log(">>========================================================================================================================================>>");

const babel = require('@babel/core');
const fs = require('fs');

const config = {
      "presets": [
            [
                  "@babel/preset-env",
                  {
                        "modules": false
                  }
            ]
      ],
      "plugins": [
            [
                  "./src/index.js"
            ]
      ]
};

let code = fs.readFileSync("./test/test1.js", "utf8");
code = "const _script_path = \"./test/main.jsx\";" + code;
// Remove all whitespaces, tabs, newlines, etc.
// code = code.trim().replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/gm, " ").trim();

babel.transformFile("./test/test1.js", config, function (err, result) {


      if (err) {
            console.log(err);
            fs.writeFileSync("./test/test1.result.js", "Error\n\n\n" + err, "utf8");
            return;
      }

      var { code, map, ast } = result;

      fs.writeFileSync("./test/test1.result.js", code, "utf8");

      console.log(code);
});
