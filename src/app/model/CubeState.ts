import { CubeSlice } from './CubeFace';

export class CubeState {

    private _name: string;
    private _face: CubeSlice;
    private _inverted: boolean;

    private constructor(name: string, face?: CubeSlice, inverted?: boolean) {
        this._name = name;
        this._face = face;
        this._inverted = inverted;
    }

    public static NOT_MOVING = new CubeState('not_moving');
    public static UP = new CubeState('up', CubeSlice.UP, false);
    public static UP_I = new CubeState('upi', CubeSlice.UP, true);
    public static DOWN = new CubeState('down', CubeSlice.DOWN, false);
    public static DOWN_I = new CubeState('downi', CubeSlice.DOWN, true);
    public static LEFT = new CubeState('left', CubeSlice.LEFT, false);
    public static LEFT_I = new CubeState('lefti', CubeSlice.LEFT, true);
    public static RIGHT = new CubeState('right', CubeSlice.RIGHT, false);
    public static RIGHT_I = new CubeState('righti', CubeSlice.RIGHT, true);
    public static FRONT = new CubeState('front', CubeSlice.FRONT, false);
    public static FRONT_I = new CubeState('fronti', CubeSlice.FRONT, true);
    public static BACK = new CubeState('back', CubeSlice.BACK, false);
    public static BACK_I = new CubeState('backi', CubeSlice.BACK, true);
    public static ROTX = new CubeState('rotx', CubeSlice.ALLX, false);
    public static ROTX_I = new CubeState('rotxi', CubeSlice.ALLX, true);
    public static ROTY = new CubeState('roty', CubeSlice.ALLY, false);
    public static ROTY_I = new CubeState('rotyi', CubeSlice.ALLY, true);
    public static ROTZ = new CubeState('rotz', CubeSlice.ALLZ, false);
    public static ROTZ_I = new CubeState('rotzi', CubeSlice.ALLZ, true);

    public static MIDDLE = new CubeState('middle', CubeSlice.MIDDLE, false);
    public static MIDDLE_I = new CubeState('middlei', CubeSlice.MIDDLE, true);
    public static EQUATORIAL = new CubeState('equatorial', CubeSlice.EQUATORIAL, false);
    public static EQUATORIAL_I = new CubeState('equatoriali', CubeSlice.EQUATORIAL, true);
    public static STANDING = new CubeState('standing', CubeSlice.STANDING, false);
    public static STANDING_I = new CubeState('standingi', CubeSlice.STANDING, true);

    get name(): string {
        return this._name;
    }

    get face(): CubeSlice {
        return this._face;
    }

    get inverted(): boolean {
        return this._inverted;
    }

}

