import * as THREE from 'three';

export class FaceColor {

    private _color: THREE.Color;

    private constructor(hex: number, name: string) {
        this._color = new THREE.Color(hex);
    }

    public static BLACK = new FaceColor(0x000000, 'black'); //black
    public static WHITE = new FaceColor(0xffffff, 'white'); //white
    public static GREEN = new FaceColor(0x009E60, 'green'); //green
    public static YELLOW = new FaceColor(0xFFD500, 'yellow'); //yellow
    public static BLUE = new FaceColor(0x0051BA, 'blue'); //blue
    public static ORANGE = new FaceColor(0xFF5800, 'orange'); //orange
    public static RED = new FaceColor(0xC41E3A, 'red'); //red

    public static ALL = new FaceColor(0x0, 'all'); //all

    

    get color(): THREE.Color {
        return this._color;
    }
}