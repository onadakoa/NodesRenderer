import React from "react"
import { InitializedNode, Normalize, Camera } from "./libs";
import "../Styles/node.css"

interface PROPS {
    Node: InitializedNode;
    MakeMeOnTop: (id: number) => void;
    CamScale: number;
}

export default class Node extends React.Component<PROPS> {
    state = {
        x: this.props.Node.position.x,
        y: this.props.Node.position.y,
        Hover: false
    }
    diffX: number = 0;
    diffY: number = 0;

    NormMulti = 10;

    constructor(props: PROPS) {
        super(props)



        addEventListener("mousemove", this.MouseMove)
        addEventListener("mouseup", this.MouseUp)
    }

    MouseMove = (e: MouseEvent) => {
        if (!this.state.Hover) return;
        let x = e.pageX / this.props.CamScale;
        let y = e.pageY / this.props.CamScale;
        this.setState({x: Normalize(x - this.diffX, this.NormMulti), y: Normalize(y - this.diffY, this.NormMulti)})
    }
    
    MouseDown = (e: React.MouseEvent) => {
        if (e.button != 0) return;
        let x = e.pageX / this.props.CamScale;
        let y = e.pageY / this.props.CamScale;
        this.diffX = x - this.state.x
        this.diffY = y - this.state.y
        let nwstate = { ...this.state }
        nwstate.Hover = true;
        this.setState(nwstate)
    }

    MouseUp = (e: MouseEvent) => {
        if (e.button != 0 || !this.state.Hover) return;
        // console.log(this.state.Hover)
        let nwstate = {...this.state}
        nwstate.Hover = false;
        this.setState(nwstate)
        this.props.MakeMeOnTop(this.props.Node.id)
    }

    GetMainStyles = (): object => {
        let st = {
            transform: "translate(" + this.state.x + "px," + this.state.y + "px)",
            zIndex: (this.state.Hover) ? 2 : 1,
            scale: this.props.CamScale.toString()
        }
        return st;    
    }

    render(): React.ReactNode {

        return (<div className="node" style={this.GetMainStyles()} onMouseDown={this.MouseDown}  >
            <div className="NodeHead">
                <span className="material-symbols-outlined">input</span>
                <p>{this.props.Node.name}</p>
                <span className="material-symbols-outlined">input</span>
            </div>
            <div className="NodeBody">
                <div>
                    <span>test</span><span>test</span>
                </div>
                <div>middle</div>
                <div>rigthside</div>
            </div>
        </div>)
    }
}