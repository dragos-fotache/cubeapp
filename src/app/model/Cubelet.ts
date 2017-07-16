import { FaceColor } from "./FaceColor";
import { CubeState } from "./CubeState";
import { CubeSlice } from "./CubeFace";
import { Graphics } from './Graphics';

import * as THREE from 'three';

export class Cubelet {

    up: FaceColor = FaceColor.BLACK;
    front: FaceColor = FaceColor.BLACK;
    down: FaceColor = FaceColor.BLACK;
    back: FaceColor = FaceColor.BLACK;
    left: FaceColor = FaceColor.BLACK;
    right: FaceColor = FaceColor.BLACK;

    all: FaceColor = FaceColor.ALL;

    i: number;
    j: number;
    k: number;

    public mesh: THREE.Mesh;

    constructor(i: number, j: number, k: number, meshes: THREE.Mesh[]) {

        this.i = i;
        this.j = j;
        this.k = k;

        var nrFaces: number = 0;

        if (i == -1) {
            this.left = FaceColor.ORANGE;
            nrFaces++;
        } else if (i == 1) {
            this.right = FaceColor.RED;
            nrFaces++;
        }
        if (j == 1) {
            this.up = FaceColor.WHITE;
            nrFaces++;
        } else if (j == -1) {
            this.down = FaceColor.YELLOW;
            nrFaces++;
        }
        if (k == -1) {
            this.back = FaceColor.BLUE;
            nrFaces++;
        } else if (k == 1) {
            this.front = FaceColor.GREEN;
            nrFaces++;
        }

        var mesh: THREE.Mesh = meshes[nrFaces - 1];

        this.mesh = mesh.clone();

        this.mesh.scale.set(0.5, 0.5, 0.5);
        this.mesh.position.set(i, j, k);

    }

    private createMesh() {
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        geometry.faces[0].color = this.right.color;
        geometry.faces[1].color = this.right.color;

        geometry.faces[2].color = this.left.color;
        geometry.faces[3].color = this.left.color;

        geometry.faces[4].color = this.up.color;
        geometry.faces[5].color = this.up.color;

        geometry.faces[6].color = this.down.color;
        geometry.faces[7].color = this.down.color;

        geometry.faces[8].color = this.front.color;
        geometry.faces[9].color = this.front.color;

        geometry.faces[10].color = this.back.color;
        geometry.faces[11].color = this.back.color;

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.SmoothShading,
            wireframe: false,
            vertexColors: THREE.FaceColors
        });

        this.mesh = new THREE.Mesh(geometry, material);

    }

    rotate(axis: Axes, ccw: boolean) {
        if (axis == Axes.X) {
            this.rotateX(ccw);
        } else if (axis == Axes.Y) {
            this.rotateY(ccw);
        } else if (axis == Axes.Z) {
            this.rotateZ(ccw);
        }
    }

    rotateX(ccw: boolean) {
        var front = this.front;
        var up = this.up;
        var back = this.back;
        var down = this.down;

        if (ccw) {
            this.front = up;
            this.up = back;
            this.back = down;
            this.down = front;
        } else {
            this.front = down;
            this.up = front;
            this.back = up;
            this.down = back;
        }
    }

    rotateY(ccw: boolean) {
        var front = this.front;
        var left = this.left;
        var back = this.back;
        var right = this.right;
        if (ccw) {
            this.front = left;
            this.left = back;
            this.back = right;
            this.right = front;
        } else {
            this.front = right;
            this.left = front;
            this.back = left;
            this.right = back;
        }
    }

    rotateZ(ccw: boolean) {
        var left = this.left;
        var up = this.up;
        var down = this.down;
        var right = this.right;

        if (ccw) {
            this.right = down;
            this.up = right;
            this.left = up;
            this.down = left;
        } else {
            this.right = up;
            this.up = left;
            this.left = down;
            this.down = right;
        }
    }

}

export enum Axes {
    X, Y, Z
}
