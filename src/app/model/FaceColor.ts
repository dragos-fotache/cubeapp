import * as THREE from 'three';

export class FaceColor {

    private _color: THREE.Color;

    private constructor(hex: number) {
        this._color = new THREE.Color(hex);
    }

    public static BLACK = new FaceColor(0x000000); //black
    public static WHITE = new FaceColor(0xffffff); //white
    public static GREEN = new FaceColor(0x009E60); //green
    public static YELLOW = new FaceColor(0xFFD500); //yellow
    public static BLUE = new FaceColor(0x0051BA); //blue
    public static ORANGE = new FaceColor(0xFF5800); //orange
    public static RED = new FaceColor(0xC41E3A); //red

    get color(): THREE.Color {
        return this._color;
    }
}