import * as THREE from 'three';

import { Cubelet } from './Cubelet';
import { Cube } from './Cube';
import { FaceColor } from "./FaceColor";

export class Graphics {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    private cube: Cube;

    private FOV = 75;
    private WIDTH = 500;
    private HEIGHT = 500;
    private NEAR = 0.1;
    private FAR = 1000;

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.camera = new THREE.PerspectiveCamera(this.FOV,
            this.WIDTH / this.HEIGHT,
            this.NEAR,
            this.FAR);
        this.renderer = new THREE.WebGLRenderer();

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

        this.camera.position.z = 5;

        this.cube = new Cube();

        this.cube.root.rotation.x = 0.5;
        this.cube.root.rotation.y = Math.PI/4;

        this.cube.rotateFaceUp();
        this.cube.rotateFaceRight();
        this.cube.rotateFaceDown();

        this.scene.add(this.cube.root);
    }

    public hookRenderer(nativeElement: any) {
        nativeElement.appendChild(this.renderer.domElement);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public update() {
        // this.cube.faces[3].rotateZ(0.01);
        // this.cube.root.rotateY(0.01);
        // this.cube.root.rotateX(0.01);
    }

}