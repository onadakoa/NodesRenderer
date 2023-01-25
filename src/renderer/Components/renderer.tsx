import React, { MouseEvent } from "react";

// components
import {CachedNode, InitializedNode, EmptyNode, Camera, Selectioner} from "./libs"
import Node from "./node";
import BackGround from "./BackGround"

// components

interface PROPS {
    StartNodes: CachedNode[]
}


export default class Renderer extends React.Component<PROPS> {
    Camera: Camera
    Selectioner: Selectioner
    
    constructor(props: PROPS) {
        super(props);
        props.StartNodes.forEach((v, i) => {
            this.Nodes.push({ id: i, name: v.name, position: { ...v.position } })
            this.state.NodesHierarchy.push(i)
        })

        this.Camera = new Camera();
        this.Camera.OnChange(this.OnCameraChangeEvent)

        this.Selectioner = new Selectioner();
    }
    
    private OnCameraChangeEvent = () => {
        this.setState({
            NodesHierarchy: this.state.NodesHierarchy,
            CamX: this.Camera.x,
            CamY: this.Camera.y,
            CamScale: this.Camera.Scale
        })
    }

    state = {
        NodesHierarchy: [-1],
        CamX: 0,
        CamY: 0,
        CamScale: 1
    }
    
    Nodes: InitializedNode[] = [EmptyNode]
    GetNodeById = (id: number): InitializedNode => {
        let out: InitializedNode = EmptyNode
        
        this.Nodes.forEach((v, i) => { if (v.id == id) out = v })
        return out;
    }
    
    MakeNodeOnTop = (id: number) => {
        let nwHierarchy = this.state.NodesHierarchy.filter(v => v != id)
        nwHierarchy.push(id)
        let nwState = { ...this.state }
        nwState.NodesHierarchy = nwHierarchy; 
        this.setState(nwState)
    }


    OnBGClicked = (ev: React.MouseEvent) => {
        this.Selectioner.ClearAll()
        this.setState(this.state)
    }


    render(): React.ReactNode {
        
        const NodesContainerStyles = {
            transform: "translate(" + this.state.CamX + "px," + this.state.CamY + "px)",
        }

        return (<>
            <BackGround CamX={this.state.CamX} CamY={this.state.CamY} CamScale={this.state.CamScale} backGroundClickedEvent={this.OnBGClicked} />
            <div className="Nodes_Container" style={NodesContainerStyles} > 
                {this.state.NodesHierarchy.map((v) => {
                    let n = this.GetNodeById(v);
                    if (n.id == -1) return;
                    return <Node key={n.id} Node={n} MakeMeOnTop={ this.MakeNodeOnTop } CamScale={this.state.CamScale} Selectioner={this.Selectioner} />
                })}
            </div>
        
        </>)
    }
}