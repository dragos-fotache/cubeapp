import { Axes } from "./Cubelet";

export class CubeSlice {

    private _name: string;
    private _normal: boolean;
    private _axis: Axes;

    private constructor(name: string, normal: boolean, axis: Axes) {
        this._name = name;
        this._normal = normal;
        this._axis = axis;
    }

    public static UP = new CubeSlice('up', true, Axes.Y);
    public static DOWN = new CubeSlice('down', false, Axes.Y);
    public static RIGHT = new CubeSlice('right', true, Axes.X);
    public static LEFT = new CubeSlice('left', false, Axes.X);
    public static FRONT = new CubeSlice('front', true, Axes.Z);
    public static BACK = new CubeSlice('back', false, Axes.Z);

    public static MIDDLE = new CubeSlice('middle', true, Axes.X);
    public static EQUATORIAL = new CubeSlice('equatorial', true, Axes.Y);
    public static STANDING = new CubeSlice('standing', true, Axes.Z);

    public static ALLX = new CubeSlice('all', false, Axes.X);
    public static ALLY = new CubeSlice('all', false, Axes.Y);
    public static ALLZ = new CubeSlice('all', false, Axes.Z);

    get name(): string {
        return this._name;
    }

    get normal(): boolean {
        return this._normal;
    }

    get axis(): Axes {
        return this._axis;
    }

}