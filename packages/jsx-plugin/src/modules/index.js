const t = require("@babel/core").types;

module.exports = {

      /**
       * @description - A function to check Uppercase words.
       * 
       * @param {String} Word - The word to check. 
       * @returns {Boolean} - Returns true if the word is uppercase.
       */
      isUpperCase(Word) {
            return Word === Word.toUpperCase();
      },

      isJSXElement(parentPath) {
            return /JSXElement/.test(parentPath.node.type);
      },

      isJSXFragment(parentPath) {
            return /JSXFragment/.test(parentPath.node.type);
      },

      isJSXNamespacedName(parentPath) {
            return /JSXNamespacedName/.test(parentPath.node.type);
      },

      isJSXEmptyExpression(parentPath) {
            return /JSXEmptyExpression/.test(parentPath.node.type);
      },

      isJSXText(parentPath) {
            return /JSXText/.test(parentPath.node.type);
      },

      isJSXExpressionContainer(parentPath) {
            return /JSXExpressionContainer/.test(parentPath.node.type);
      },

      isJSXSpreadChild(parentPath) {
            return /JSXSpreadChild/.test(parentPath.node.type);
      },

      hasJSX(parentPath) {
            let fileHasJSX = false;
            parentPath.traverse({
                  "JSXElement|JSXFragment"(path) {
                        fileHasJSX = true;
                        path.stop();
                  }

            });
            return fileHasJSX;
      },

      // Process JSXExpressionContainer
      processJSXExpressionContainer(parentPath, state) {
            const NODE = parentPath.node;

            if (this.isJSXExpressionContainer(parentPath)) {

                  const CHILDREN = parentPath.get('expression');

                  if (this.isJSXElement(CHILDREN)) {
                        return this.createJSXElement(CHILDREN, state);
                  }

                  if (this.isJSXFragment(CHILDREN)) {
                        return this.createJSXElement(CHILDREN, state, true);
                  }

                  if (this.isJSXEmptyExpression(CHILDREN)) {

                        return null;
                  }

                  if (this.isJSXText(CHILDREN)) {
                        return t.StringLiteral(NODE.value ?? "");
                  }

                  if (this.isJSXSpreadChild(CHILDREN)) {
                        console.log("JSXSpreadChild: ", CHILDREN.node);
                        return null;
                  }
            }
            return NODE.expression ? NODE.expression : t.StringLiteral(NODE.value ?? "");
      },

      createAttribute(attrs, file) {

            const generateAttrObject = (nodes) => {
                  let arr = nodes.map(node => {
                        let rawName = node.name.name;
                        let name = t.StringLiteral(rawName);
                        let value = (
                              !node.value ? t.BooleanLiteral(true) :
                                    /JSXExpressionContainer/i.test(node.value.type) ? node.value.expression :
                                          node.value
                        );

                        return t.ObjectProperty(name, value);
                  });

                  return [t.ObjectExpression(arr)];
            };

            let _expressions = [],
                  _spreads = [];

            while (attrs.length) {
                  let attr = attrs.shift();

                  /^JSXSpreadAttribute$/i.test(attr.type) ? _spreads.push(attr.argument) : _expressions.push(attr);
            }

            let attrObject = _expressions.length ? generateAttrObject(_expressions) : null;

            if (_spreads.length) {
                  let extension = attrObject ? attrObject.concat(_spreads) : _spreads;

                  if (extension.length > 1) extension.unshift(t.ObjectExpression([]));

                  attrObject = t.callExpression(
                        file.addHelper('extends'),
                        extension
                  );
            } else {
                  attrObject = attrObject[0];
            }

            return attrObject;
      },


      createJSXElement(path, state) {
            const isFragment = this.isJSXFragment(path);

            const FILE = state.file,
                  OPTIONS = Object.assign({}, { name: 'name', props: 'props', attributes: 'attributes', children: 'children' }, state.opts);

            const NODE = path.node;

            if (!/JSXElement|JSXFragment/.test(NODE.type)) {
                  return NODE.expression ? NODE.expression : t.StringLiteral(NODE.value ?? "")
            };

            const OPENING_ELEMENT = NODE.openingElement,
                  CHILDREN = path.get('children'),
                  ELEMENT_ATTRIBUTES = !isFragment ? OPENING_ELEMENT.attributes : [];


            var type;
            if (this.isJSXElement(path)) {
                  type = this.isUpperCase(OPENING_ELEMENT.name.name[0]) ? t.identifier(OPENING_ELEMENT.name.name) : t.StringLiteral(OPENING_ELEMENT.name.name);
            
            } else if (this.isJSXFragment(path)) {
                  type = t.StringLiteral('Fragment');
            }
            
            let attributes = ELEMENT_ATTRIBUTES.length ? this.createAttribute(ELEMENT_ATTRIBUTES, FILE) : t.ObjectExpression([]);

            let children = CHILDREN.length ?
                  t.arrayExpression(CHILDREN.map(child => {

                        // console.log(child.node.type, ": ", child.node);

                        if (this.isJSXElement(child)) {

                              return this.createJSXElement(child, state);

                        } else if (this.isJSXFragment(child)) {

                              return this.createJSXFragment(child, state);

                        } else if (this.isJSXText(child)) {

                              return t.StringLiteral(child.node.value);

                        } else if (this.isJSXExpressionContainer(child)) {

                              return this.processJSXExpressionContainer(child, state);

                        } else if (this.isJSXSpreadChild(child)) {

                              return child.node.expression;

                        } else {

                              return child.node ? child.node : t.StringLiteral(child.node.value ?? "");

                        }

                  })) : t.arrayExpression([]);




            return t.ObjectExpression([

                  t.ObjectProperty(t.StringLiteral(OPTIONS.name), type),

                  t.ObjectProperty(t.StringLiteral(OPTIONS.props), t.ObjectExpression([

                        t.ObjectProperty(t.StringLiteral(OPTIONS.attributes), attributes),

                        t.ObjectProperty(t.StringLiteral(OPTIONS.children), children)

                  ])),
            ]);

      },

}
