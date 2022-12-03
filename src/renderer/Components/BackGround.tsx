import React from "react";

interface PROPS {
    CamX: number,
    CamY: number,
    CamScale: number
}

export default class BackGround extends React.Component<PROPS> {
    state = {
        x: 50,
        y: 50
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
            this.setState({x: Cx, y: Cy })
        })
    }

    render(): React.ReactNode {
        const st = {
            backgroundPosition: this.state.x + "px " + this.state.y + "px",
            backgroundSize: (100 * this.props.CamScale) + "px " + (100 * this.props.CamScale) + "px"
        }

        return (<>
            <div className="BackGround" style={st} />
        </>)
    }
}