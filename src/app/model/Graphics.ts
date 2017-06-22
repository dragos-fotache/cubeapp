import * as THREE from 'three';

import { Cubelet } from './Cubelet';
import { Cube, CubeState } from './Cube';
import { FaceColor } from "./FaceColor";

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

    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc);
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

        this.camera.position.z = 8;

        this.cube = new Cube();

        this.cube.root.rotation.x = 0.5;
        this.cube.root.rotation.y = Math.PI/4;

        // this.cube.logicRotateFaceUp();
        // this.cube.logicRotateFaceRight();
        // this.cube.logicRotateFaceDown();
        // this.cube.logicRotateFaceFront();

        this.scene.add(this.cube.root);
    }

    public hookRenderer(nativeElement: any) {
        nativeElement.appendChild(this.renderer.domElement);
    }

    public render() {
        this.renderer.render(this.scene, this.camera);
    }

    public update(delta: number) {
        if (this.cube.state == CubeState.MOVING_UP) {
            this.cube.rotateFaceUp(delta);
        } else if (this.cube.state == CubeState.MOVING_UP_I) {
            this.cube.rotateFaceUpi(delta);
        } else if (this.cube.state == CubeState.MOVING_RIGHT) {
            this.cube.rotateFaceRight(delta);
        } else if (this.cube.state == CubeState.MOVING_RIGHT_I) {
            this.cube.rotateFaceRighti(delta);
        }
    }

    public startRotationUp() {
        if (this.cube.state == CubeState.NOT_MOVING) {
            this.cube.state = CubeState.MOVING_UP;
        }
    }

    public startRotationUpi() {
        if (this.cube.state == CubeState.NOT_MOVING) {
            this.cube.state = CubeState.MOVING_UP_I;
        }
    }

    public startRotationRight() {
        if (this.cube.state == CubeState.NOT_MOVING) {
            this.cube.state = CubeState.MOVING_RIGHT;
        }
    }

    public startRotationRighti() {
        if (this.cube.state == CubeState.NOT_MOVING) {
            this.cube.state = CubeState.MOVING_RIGHT_I;
        }
    }

}