import { Renderer } from "./renderer";
import "./renderer/Styles/styles.css"

let obj1 = { id: 1, name: "nameTest", position: { x: 0, y: 0 } }
let obj2 = { id: 2, name: "secound", position: { x: 100, y: 100 } }

const obj = new Renderer(document.querySelector("#App"), [obj1, obj2])