import React from "react"
import ReactDom from "react-dom/client"

import { CachedNode } from "./Components/libs"
// Components
import Engine from "./Components/renderer"

// Components


export class Renderer {
    root: ReactDom.Root


    constructor(Container: Element, StartData?: CachedNode[]) {

        let Nodes: CachedNode[] = (StartData == undefined) ? [] : StartData;

        this.root = ReactDom.createRoot(Container)
        this.root.render(<>
            <Engine
                StartNodes={Nodes}
            />
        </>)
    }
}
