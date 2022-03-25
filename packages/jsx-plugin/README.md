## JSX-PLUGIN

This is a Babel-Plugin to convert JSX code to Wever's XSET(Xeon-Stack-Element-Tree) Object Model.

```jsx
export default function App (props) {

      return (
            <div className="container" id="first-div" style={style.container}>
                  <h1 style={{ color: "#fff", backgroundColor: "#000" }}>Hello World</h1>
                  <h1>My name is Arif Sardar</h1>
            </div>
      );
}
```
### Converts into :
```js
export default function App(props) {
      return {
            "name": "div",
            "props": {
                  "attributes": {
                        "className": "container",
                        "id": "first-div",
                        "style": style.container
                  },
                  "children": [{
                        "name": "h1",
                        "props": {
                              "attributes": {
                                    "style": {
                                          color: "#fff",
                                          backgroundColor: "#000"
                                    }
                              },
                              "children": ["Hello World"]
                        }
                  }, {
                        "name": "h1",
                        "props": {
                              "attributes": {},
                              "children": ["My name is Arif Sardar"]
                        }
                  }]
            }
      };
}
```
