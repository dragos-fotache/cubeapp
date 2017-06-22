import { Cubelet } from './Cubelet';
import { Face } from './Face';
import { FaceColor } from './FaceColor';

import * as THREE from 'three';

export class Cube {
    public faces: Array<Face>;

    public root: THREE.Group;

    private cubelets: Array<Cubelet>;

    constructor() {
        this.root = new THREE.Group();

        this.faces = new Array<Face>();

        this.cubelets = this.createAllCubelets();

        for (var c of this.cubelets) {
            this.root.add(c.mesh);
        }

    }

    rotateFaceUp() {
        for (var c of this.cubelets) {
            if (c.up != FaceColor.BLACK) {
                c.rotateY_CW();
            }
        }
    }

    rotateFaceUpi() {
        for (var c of this.cubelets) {
            if (c.up != FaceColor.BLACK) {
                c.rotateY_CCW();
            }
        }
    }

    rotateFaceDown() {
        for (var c of this.cubelets) {
            if (c.down != FaceColor.BLACK) {
                c.rotateY_CCW();
            }
        }
    }

    rotateFaceDowni() {
        for (var c of this.cubelets) {
            if (c.down != FaceColor.BLACK) {
                c.rotateY_CW();
            }
        }
    }

    rotateFaceRight() {
        for (var c of this.cubelets) {
            if (c.right != FaceColor.BLACK) {
                c.rotateX_CW();
            }
        }
    }

    rotateFaceRighti() {
        for (var c of this.cubelets) {
            if (c.right != FaceColor.BLACK) {
                c.rotateX_CCW();
            }
        }
    }

    rotateFaceLeft() {
        for (var c of this.cubelets) {
            if (c.left != FaceColor.BLACK) {
                c.rotateX_CCW();
            }
        }
    }

    rotateFaceLefti() {
        for (var c of this.cubelets) {
            if (c.left != FaceColor.BLACK) {
                c.rotateX_CW;
            }
        }
    }

    rotateFaceFront() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CW();
            }
        }
    }

    rotateFaceFronti() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CCW();
            }
        }
    }

    rotateFaceBack() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CCW();
            }
        }
    }

    rotateFaceBacki() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CW();
            }
        }
    }

    private createAllCubelets(): Array<Cubelet> {

        var cubelets = new Array<Cubelet>();

        var coords = [-1, 0, 1];

        for (var i of coords) {
            for (var j of coords) {
                for (var k of coords) {
                    if (i != 0 || j != 0 || k != 0) {
                        cubelets.push(new Cubelet(i, j, k));
                    }
                }
            }
        }

        return cubelets;
    }
}