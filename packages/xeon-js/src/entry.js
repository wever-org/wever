import createRealElement from "./modules/methods/real_element";

console.time("Create Real Element");
console.log(createRealElement("h1"));
console.timeEnd("Create Real Element");

console.log(<h1>Hello World</h1>);

// import xeon from "./modules/prev/xeon-org";

// xeon.config(
//       <h1>Hello World</h1>
//       , document.getElementById("root")
// );