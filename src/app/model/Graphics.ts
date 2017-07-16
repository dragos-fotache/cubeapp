import * as THREE from 'three';

import { Cubelet } from './Cubelet';
import { Cube } from './Cube';
import { CubeState } from './CubeState';
import { CubeSlice } from './CubeFace';
import { FaceColor } from "./FaceColor";

import * as ColladaLoader from 'three-collada-loader';

export class Graphics {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    private cube: Cube;

    private FOV = 60;
    private WIDTH = 500;
    private HEIGHT = 500;
    private NEAR = 0.1;
    private FAR = 1000;

    constructor(meshes: THREE.Mesh[]) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc);
        this.camera = new THREE.PerspectiveCamera(this.FOV,
            this.WIDTH / this.HEIGHT,
            this.NEAR,
            this.FAR);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(this.WIDTH, this.HEIGHT);

        var light = new THREE.PointLight(0xffffff);
        light.position.x = 2;
        light.position.y = 1;
        light.position.z = 10;
        light.intensity = 1;

        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.3;

        this.scene.add(light);
        this.scene.add(ambientLight);

        this.camera.position.z = 8;

        this.cube = new Cube(meshes);

        this.cube.root.rotation.x = 0.5;
        this.cube.root.rotation.y = Math.PI / 4;

        // this.cube.rotateFace(CubeState.UP);
        // this.cube.rotateFace(CubeState.RIGHT);
        // this.cube.rotateFace(CubeState.DOWN);

        this.scene.add(this.cube.root);

        // for (var m of this.cube.cubelets) {
        //     m.mesh.position.x = m.i;
        // }

        console.log(this.cube.cubelets);
    }

    public hookRenderer(nativeElement: any) {
        nativeElement.appendChild(this.renderer.domElement);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public update(delta: number) {

        var cubs: Cubelet[] = this.cube.getFace(CubeSlice.UP);

        for (var c of cubs) {
            c.mesh.position.x += 0.01;
        }

        if (this.cube.state != CubeState.NOT_MOVING) {
            this.cube.rotateFaceUpdate(this.cube.state, delta);
        }
    }

    public startRotation(rtype: string) {
        if (this.cube.state == CubeState.NOT_MOVING) {
            this.cube.state = CubeState[rtype];
        }
    }

    // public static normalize(mesh: THREE.Mesh) {
    //     mesh.updateMatrix();
    //     mesh.applyMatrix(mesh.matrix);
    //     mesh.position.set(0, 0, 0);
    //     mesh.rotation.set(0, 0, 0);
    //     mesh.scale.set(1, 1, 1);
    //     mesh.updateMatrix();
    // }

}