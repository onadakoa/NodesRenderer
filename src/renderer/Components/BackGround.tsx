import React from "react";

interface PROPS {
    CamX: number;
    CamY: number;
    CamScale: number;
    // backGroundClickedEvent: (event: React.MouseEvent) => void;
}

export default class BackGround extends React.Component<PROPS> {
    state = {
        x: 0,
        y: 0
    }

    Clamp = (value: number, max: number, min: number = 0): number => {
        if (value > max) return max;
        if (value < min) return min;
        return value;
    }

    Normalize = (value: number, n: number) => {
        value = value / n;
        value = +value.toFixed(0);
        value = value * n;
        console.log(value)
        return value;
    }

    constructor(props: PROPS) {
        super(props);

        addEventListener("mousemove", (ev) => {
            let Cx = this.props.CamX;
            let Cy = this.props.CamY;
            if (this.state.x == Cx && this.state.y == Cy) return;
            this.setState({x: Cx, y: Cy })
        })

        addEventListener("wheel", this.MouseWheel)
    }


    MouseWheel = (ev: WheelEvent) => {
        
    }

    click = (ev: React.MouseEvent) => {
        console.log("background clicked")
    }

    render(): React.ReactNode {
        let per = 10// * this.props.CamScale;
        const st = {
            backgroundPosition: this.state.x + "px " + this.state.y + "px",
            backgroundSize: (100 * this.props.CamScale) + "px " + (100 * this.props.CamScale) + "px",
            // backgroundSize: (100) + "px " + (100) + "px",
            backgroundImage: "radial-gradient(rgba(255,255,255,0.1) " + per +  "%,transparent " + per + "%)",
        }

        return (<>
            <div className="BackGround" style={st} onClick={this.click}  />
        </>)
    }
}