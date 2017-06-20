import { FaceColor } from "./FaceColor";

import * as THREE from 'three';

export class Cubelet {

    private faceColors: FaceColor[];

    public mesh: THREE.Mesh;

    constructor(c0: FaceColor = FaceColor.BLACK, 
                c1: FaceColor = FaceColor.BLACK,
                c2: FaceColor = FaceColor.BLACK,
                c3: FaceColor = FaceColor.BLACK,
                c4: FaceColor = FaceColor.BLACK,
                c5: FaceColor = FaceColor.BLACK) {
        this.faceColors = [c0, c1, c2, c3, c4, c5];

        this.createMesh();
    }

    private createMesh() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        geometry.faces[0].color = this.faceColors[5].color;
        geometry.faces[1].color = this.faceColors[5].color;

        geometry.faces[2].color = this.faceColors[4].color;
        geometry.faces[3].color = this.faceColors[4].color;

        geometry.faces[4].color = this.faceColors[0].color;
        geometry.faces[5].color = this.faceColors[0].color;

        geometry.faces[6].color = this.faceColors[2].color;
        geometry.faces[7].color = this.faceColors[2].color;

        geometry.faces[8].color = this.faceColors[1].color;
        geometry.faces[9].color = this.faceColors[1].color;

        geometry.faces[10].color = this.faceColors[3].color;
        geometry.faces[11].color = this.faceColors[3].color;

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            wireframe: false,
            vertexColors: THREE.FaceColors
        });

        this.mesh = new THREE.Mesh(geometry, material);

    }

}
