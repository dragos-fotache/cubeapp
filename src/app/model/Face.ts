import { Cubelet } from './Cubelet';

import * as THREE from 'three';

export class Face {
    private cubelets: Array<Cubelet>;

    private center: THREE.Object3D;

    constructor(cubelets: Array<Cubelet>, center: THREE.Vector3) {

        this.cubelets = cubelets;
        this.center = center;

    }

    rotateY(t: number) {
        for (var c of this.cubelets) {
            this.center.add(c.mesh);
        }
        this.center.rotateY(t);
    }
}