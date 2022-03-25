function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Basic html test
// const a = (<div>Hello World</div>)
// Children Test
// const b = (<div><h1>Hello</h1></div>)
// attr test
// const c = (<div id="test" className="test" style={{ height: "100%" }}></div>)
// spread test
// const d = (<div hello="world" {...{ id: "test", className: "test" }}>Hello Spread Attributes</div>)
// Self-closing tag test
// const e = (<div />)
// Fragment test
// const f = (<>Hello World</>)
// Componenet test
// const g = (<App />);
// Comment Testing
var h = {
  "name": "div",
  "props": {
    "attributes": {},
    "children": [_toConsumableArray(props)]
  }
}; // NameSpace test
// const i = (<svg:sg>
//       <svg:g>
//             <svg:circle cx="50" cy="50" r="40" fill="red" />
//       </svg:g>
// </svg:sg>)
// Compound Test
// export default function test1(props) {
//       const styles = {
//             height: "100%",
//             width: "100%",
//             backgroundColor: "red"
//       }
//       return (<>
//             <div style={styles} id="id" className="class">
//                   <h1>Hello</h1>
//                   <h1>World</h1>
//             </div>
//             {/* Inline Comments */}
//             <div {...props} id="id" className="class">
//                   <h1>Hello</h1>
//                   <h1>World</h1>
//             </div>
//       </>)
// }