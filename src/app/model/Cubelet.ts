import { FaceColor } from "./FaceColor";

import * as THREE from 'three';

export class Cubelet {

    up: FaceColor = FaceColor.BLACK;
    front: FaceColor = FaceColor.BLACK;
    down: FaceColor = FaceColor.BLACK;
    back: FaceColor = FaceColor.BLACK;
    left: FaceColor = FaceColor.BLACK;
    right: FaceColor = FaceColor.BLACK;

    public mesh: THREE.Mesh;

    constructor(i: number, j: number, k: number) {

        if (i == -1) {
            this.left = FaceColor.ORANGE;
        } else if (i == 1) {
            this.right = FaceColor.RED;
        }
        if (j == 1) {
            this.up = FaceColor.WHITE;
        } else if (j == -1) {
            this.down = FaceColor.YELLOW;
        }
        if (k == -1) {
            this.back = FaceColor.BLUE;
        } else if (k == 1) {
            this.front = FaceColor.GREEN;
        }

        this.createMesh();

        this.mesh.position.x = i;
        this.mesh.position.y = j;
        this.mesh.position.z = k;

        this.mesh.scale.x = 0.95;
        this.mesh.scale.y = 0.95;
        this.mesh.scale.z = 0.95;

        this.normalize();

    }

    private normalize() {
        this.mesh.updateMatrix();
        this.mesh.geometry.applyMatrix(this.mesh.matrix);
        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);
        this.mesh.scale.set(1, 1, 1);
        this.mesh.updateMatrix();
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

    rotateY_CW() {
        this.mesh.rotateY(-Math.PI / 2);
        this.normalize();
        var front = this.front;
        var left = this.left;
        var back = this.back;
        var right = this.right;

        this.front = right;
        this.left = front;
        this.back = left;
        this.right = back;
    }

    rotateY_CCW() {
        this.mesh.rotateY(Math.PI / 2);
        this.normalize();
        var front = this.front;
        var left = this.left;
        var back = this.back;
        var right = this.right;

        this.front = left;
        this.left = back;
        this.back = right;
        this.right = front;
    }

    rotateX_CW() {
        this.mesh.rotateX(-Math.PI / 2);
        this.normalize();
        var front = this.front;
        var up = this.up;
        var back = this.back;
        var down = this.down;

        this.front = down;
        this.up = front;
        this.back = up;
        this.down = back;
    }

    rotateX_CCW() {
        this.mesh.rotateX(Math.PI / 2);
        this.normalize();
        var front = this.front;
        var up = this.up;
        var back = this.back;
        var down = this.down;

        this.front = up;
        this.up = back;
        this.back = down;
        this.down = front;
    }

    rotateZ_CW() {
        this.mesh.rotateZ(-Math.PI / 2);
        this.normalize();
        var left = this.left;
        var up = this.up;
        var down = this.down;
        var right = this.right;

        this.right = up;
        this.up = left;
        this.left = down;
        this.down = right;
    }

    rotateZ_CCW() {
        this.mesh.rotateZ(Math.PI / 2);
        this.normalize();
        var left = this.left;
        var up = this.up;
        var down = this.down;
        var right = this.right;

        this.right = down;
        this.up = right;
        this.left = up;
        this.down = left;
    }

}
