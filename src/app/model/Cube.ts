import { Cubelet } from './Cubelet';
import { Face } from './Face';
import { FaceColor } from './FaceColor';

import * as THREE from 'three';

export class Cube {
    public faces: Array<Face>;

    public root: THREE.Group;

    public state: CubeState = CubeState.NOT_MOVING;

    private cubelets: Array<Cubelet>;

    private ROTATION_SPEED = 1; //in seconds

    private totalRotation = 0;


    constructor() {
        this.root = new THREE.Group();

        this.faces = new Array<Face>();

        this.cubelets = this.createAllCubelets();

        for (var c of this.cubelets) {
            this.root.add(c.mesh);
        }
    }

    rotateFaceUp(delta: number) {
        var t =  (Math.PI / 2) * (delta / (this.ROTATION_SPEED * 1000));
        this.totalRotation += t;

        if (this.totalRotation >= Math.PI / 2) {
            this.totalRotation = 0;
            this.state = CubeState.NOT_MOVING;
            for (var c of this.cubelets) {
                if (c.up != FaceColor.BLACK) {
                    c.mesh.rotation.y = -Math.PI / 2;
                    c.normalize();
                }
            }
            this.logicRotateFaceUp();
        } else {
            for (var c of this.cubelets) {
                if (c.up != FaceColor.BLACK) {
                    c.mesh.rotateY(-t);
                }
            }
        }
    }

    rotateFaceUpi(delta: number) {
        var t =  (Math.PI / 2) * (delta / (this.ROTATION_SPEED * 1000));
        this.totalRotation += t;

        if (this.totalRotation >= Math.PI / 2) {
            this.totalRotation = 0;
            this.state = CubeState.NOT_MOVING;
            for (var c of this.cubelets) {
                if (c.up != FaceColor.BLACK) {
                    c.mesh.rotation.y = Math.PI / 2;
                    c.normalize();
                }
            }
            this.logicRotateFaceUpi();
        } else {
            for (var c of this.cubelets) {
                if (c.up != FaceColor.BLACK) {
                    c.mesh.rotateY(t);
                }
            }
        }
    }

    rotateFaceRight(delta: number) {
        var t =  (Math.PI / 2) * (delta / (this.ROTATION_SPEED * 1000));
        this.totalRotation += t;

        if (this.totalRotation >= Math.PI / 2) {
            this.totalRotation = 0;
            this.state = CubeState.NOT_MOVING;
            for (var c of this.cubelets) {
                if (c.right != FaceColor.BLACK) {
                    c.mesh.rotation.x = -Math.PI / 2;
                    c.normalize();
                }
            }
            this.logicRotateFaceRight();
        } else {
            for (var c of this.cubelets) {
                if (c.right != FaceColor.BLACK) {
                    c.mesh.rotateX(-t);
                }
            }
        }
    }

    rotateFaceRighti(delta: number) {
        var t =  (Math.PI / 2) * (delta / (this.ROTATION_SPEED * 1000));
        this.totalRotation += t;

        if (this.totalRotation >= Math.PI / 2) {
            this.totalRotation = 0;
            this.state = CubeState.NOT_MOVING;
            for (var c of this.cubelets) {
                if (c.right != FaceColor.BLACK) {
                    c.mesh.rotation.x = Math.PI / 2;
                    c.normalize();
                }
            }
            this.logicRotateFaceRighti();
        } else {
            for (var c of this.cubelets) {
                if (c.right != FaceColor.BLACK) {
                    c.mesh.rotateX(t);
                }
            }
        }
    }

    logicRotateFaceUp() {
        for (var c of this.cubelets) {
            if (c.up != FaceColor.BLACK) {
                c.rotateY_CW();
            }
        }
    }

    logicRotateFaceUpi() {
        for (var c of this.cubelets) {
            if (c.up != FaceColor.BLACK) {
                c.rotateY_CCW();
            }
        }
    }

    logicRotateFaceDown() {
        for (var c of this.cubelets) {
            if (c.down != FaceColor.BLACK) {
                c.rotateY_CCW();
            }
        }
    }

    logicRotateFaceDowni() {
        for (var c of this.cubelets) {
            if (c.down != FaceColor.BLACK) {
                c.rotateY_CW();
            }
        }
    }

    logicRotateFaceRight() {
        for (var c of this.cubelets) {
            if (c.right != FaceColor.BLACK) {
                c.rotateX_CW();
            }
        }
    }

    logicRotateFaceRighti() {
        for (var c of this.cubelets) {
            if (c.right != FaceColor.BLACK) {
                c.rotateX_CCW();
            }
        }
    }

    logicRotateFaceLeft() {
        for (var c of this.cubelets) {
            if (c.left != FaceColor.BLACK) {
                c.rotateX_CCW();
            }
        }
    }

    logicRotateFaceLefti() {
        for (var c of this.cubelets) {
            if (c.left != FaceColor.BLACK) {
                c.rotateX_CW;
            }
        }
    }

    logicRotateFaceFront() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CW();
            }
        }
    }

    logicRotateFaceFronti() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CCW();
            }
        }
    }

    logicRotateFaceBack() {
        for (var c of this.cubelets) {
            if (c.front != FaceColor.BLACK) {
                c.rotateZ_CCW();
            }
        }
    }

    logicRotateFaceBacki() {
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

export enum CubeState {
    NOT_MOVING,
    MOVING_UP,
    MOVING_UP_I,
    MOVING_RIGHT,
    MOVING_RIGHT_I
}