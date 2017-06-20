import { Cubelet } from './Cubelet';
import { Cube } from './Cube';

import * as THREE from 'three';

export class Face {
    private cubelets: Array<Cubelet>;

    constructor(cubelets: Array<Cubelet>) {
        this.cubelets = cubelets;
    }
    
    rotateX(t: number) {
        for (var c of this.cubelets) {
            c.mesh.rotateX(t);
        }
    }

    rotateY(t: number) {
        for (var c of this.cubelets) {
            c.mesh.rotateY(t);
        }
    }

    rotateZ(t: number) {
        for (var c of this.cubelets) {
            c.mesh.rotateZ(t);
        }
    }
}