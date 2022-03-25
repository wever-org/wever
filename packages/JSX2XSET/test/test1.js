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
const h = (<div>{[...props]}</div>);

// NameSpace test
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
