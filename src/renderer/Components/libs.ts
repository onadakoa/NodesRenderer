export interface CachedNode {
    name: string;
    position: { x: number, y: number }
}

export interface InitializedNode {
    id: number;
    name: string;
    position: { x: number, y: number };
}

export const EmptyNode: InitializedNode = {
    id: -1,
    name: "",
    position: { x: -100, y: -100 }
}

export const Normalize = (value: number, n: number) => {
    value = value / n;
    value = +value.toFixed(0);
    value = value * n;
    return value;
}

export const Clamp = (value: number, max: number = 100, min: number = 0) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

export class Camera {
    x: number
    y: number
    Scale: number = 1;
    private Hovered = false;

    Sx = 0;
    Sy = 0;

    NotifyListeners: (() => void)[] = []

    constructor(InitialX = 0, InitialY = 0) {
        this.x = InitialX;
        this.y = InitialY;

        addEventListener("mouseup", this.OnMouseUp)
        addEventListener("mousedown", this.OnMouseDown)
        addEventListener("mousemove", this.OnMouseMove)
        addEventListener("wheel", this.OnScrol)
    }

    private OnScrol = (ev: WheelEvent) => {
        this.Scale = Clamp(+(this.Scale - +(ev.deltaY / 1000).toFixed(1)).toFixed(1), 1.5, 0.1);
        this.Notify();
    }

    private OnMouseDown = (ev: MouseEvent) => {
        if (ev.button != 1) return;
        this.Sx = ev.pageX - this.x;
        this.Sy = ev.pageY - this.y;
        this.Hovered = true;
    }
    private OnMouseMove = (ev: MouseEvent) => {
        if (!(this.Hovered)) return;

        this.x = ev.pageX - this.Sx;
        this.y = ev.pageY - this.Sy;
        this.Notify()
    }
    private OnMouseUp = (ev: MouseEvent) => { this.Hovered = false; }

    public GetX() { return this.x }
    public GetY() { return this.y }
    public GetPosition() { return { x: this.x, y: this.y } }

    public OnChange(Listener: () => void) {
        this.NotifyListeners.push(Listener)
    }
    private Notify() {
        this.NotifyListeners.forEach((f) => f())
    }
}