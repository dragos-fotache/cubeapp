import { Cubelet } from './Cubelet';

import * as THREE from 'three';

export class Face {
    private cubelets: Array<Cubelet>;

    public root: THREE.Group;

    constructor(cubelets: Array<Cubelet>) {

        this.root = new THREE.Group();

        this.cubelets = cubelets;

        for (var c of cubelets) {
            this.root.add(c.mesh);
        }

    }
}