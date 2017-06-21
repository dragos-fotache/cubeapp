import { FaceColor } from "./FaceColor";

import * as THREE from 'three';

export class Cubelet {

    private faceColors: FaceColor[];

    public mesh: THREE.Mesh;

    constructor(params: CubeletParams) {
        this.faceColors = [params.up, params.front,
                           params.down, params.back,
                           params.left, params.right];

        console.log(this.faceColors);

        this.createMesh();
    }

    private createMesh() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        geometry.faces[0].color = this.faceColors[5] == undefined ? FaceColor.BLACK.color : this.faceColors[5].color;
        geometry.faces[1].color = this.faceColors[5] == undefined ? FaceColor.BLACK.color : this.faceColors[5].color;

        geometry.faces[2].color = this.faceColors[4] == undefined ? FaceColor.BLACK.color : this.faceColors[4].color;
        geometry.faces[3].color = this.faceColors[4] == undefined ? FaceColor.BLACK.color : this.faceColors[4].color;

        geometry.faces[4].color = this.faceColors[0] == undefined ? FaceColor.BLACK.color : this.faceColors[0].color;
        geometry.faces[5].color = this.faceColors[0] == undefined ? FaceColor.BLACK.color : this.faceColors[0].color;

        geometry.faces[6].color = this.faceColors[2] == undefined ? FaceColor.BLACK.color : this.faceColors[2].color;
        geometry.faces[7].color = this.faceColors[2] == undefined ? FaceColor.BLACK.color : this.faceColors[2].color;

        geometry.faces[8].color = this.faceColors[1] == undefined ? FaceColor.BLACK.color : this.faceColors[1].color;
        geometry.faces[9].color = this.faceColors[1] == undefined ? FaceColor.BLACK.color : this.faceColors[1].color;

        geometry.faces[10].color = this.faceColors[3] == undefined ? FaceColor.BLACK.color : this.faceColors[3].color;
        geometry.faces[11].color = this.faceColors[3] == undefined ? FaceColor.BLACK.color : this.faceColors[3].color;

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            wireframe: false,
            vertexColors: THREE.FaceColors
        });

        this.mesh = new THREE.Mesh(geometry, material);

    }

}

export interface CubeletParams {
    up? : FaceColor;
    front?: FaceColor;
    down?: FaceColor;
    back?: FaceColor;
    left?: FaceColor;
    right?: FaceColor;
}
