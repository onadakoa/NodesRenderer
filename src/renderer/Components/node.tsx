import React from "react"
import { InitializedNode, Normalize, Camera, Selectioner } from "./libs";
import "../Styles/node.css"

interface PROPS {
    Node: InitializedNode;
    MakeMeOnTop: (id: number) => void;
    CamScale: number;
    Selectioner: Selectioner;
}

export default class Node extends React.Component<PROPS> {
    state = {
        x: this.props.Node.position.x,
        y: this.props.Node.position.y,
        Hover: false,
        // Selected: false
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

        this.props.Selectioner.AddSelection(this.props.Node.id)
        // nwstate.Selected = true;
        
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

    GetSelectionColor = (): string => {

        if (this.state.Hover) return "yellow"
        if (this.props.Selectioner.ISelected(this.props.Node.id)) return "white"

        return "black";
    }

    GetMainStyles = (): object => {
        let st = {
            transform: "translate(" + this.state.x + "px," + this.state.y + "px)",
            zIndex: (this.state.Hover) ? 2 : 1,
            scale: this.props.CamScale.toString(),
            border: ("2px " + (this.GetSelectionColor()) + " solid")
        }
        // console.log(st)
        return st;    
    }


    render(): React.ReactNode {

        return (<div className="node" style={this.GetMainStyles()} onMouseDown={this.MouseDown} >
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