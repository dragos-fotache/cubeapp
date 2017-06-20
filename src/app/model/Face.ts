import { Cubelet } from './Cubelet';
import { Cube } from './Cube';

import * as THREE from 'three';

export class Face {
    private cubelets: Array<Cubelet>;

    private center: THREE.Object3D;

    private parent: Cube;

    constructor(cubelets: Array<Cubelet>, center: THREE.Vector3, parent: Cube) {

        this.cubelets = cubelets;
        this.center = new THREE.Object3D();
        this.center.position.x = center.x;
        this.center.position.y = center.y;
        this.center.position.z = center.z;

        this.parent = parent;

    }

    rotateY(t: number) {

        var vector = new THREE.Vector3(1, 1, 1);

        for (var c of this.cubelets) {
            c.mesh.rotateX(0.4);
        }

    }
}