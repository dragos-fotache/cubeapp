import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

import { Graphics } from './model/Graphics';

import * as THREE from 'three';

@Component({
    selector: 'graphics2',
    templateUrl: './graphics2.component.html',
    styleUrls: ['./graphics2.component.css']
})
export class Graphics2Component implements OnInit {
    @ViewChild('myCanvas')
    canvasRef: ElementRef;

    private lastUpdate;

    private FOV = 60;
    private WIDTH = 500;
    private HEIGHT = 500;
    private NEAR = 0.1;
    private FAR = 1000;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    private models: Array<THREE.Mesh> = new Array<THREE.Mesh>();

    private loader: THREE.JSONLoader = new THREE.JSONLoader();

    constructor(private ngZone: NgZone) {
    }

    ngOnInit() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
            } else {
                this.lastUpdate = Date.now();
            }
        });

        this.lastUpdate = Date.now();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc);
        this.camera = new THREE.PerspectiveCamera(60,
            this.WIDTH / this.HEIGHT,
            this.NEAR,
            this.FAR);
        this.camera.position.z = 15;

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

        this.canvasRef.nativeElement.appendChild(this.renderer.domElement);
        this.ngZone.runOutsideAngular(() => this.paint());

        var fileNames = ['assets/cube1.json', 'assets/cube2.json', 'assets/cube3.json'];

        this.loadNextFile(fileNames, 0);

    }

    private loadNextFile(fileNames: string[], index: number) {

        this.loader.load(fileNames[index], (geometry: any, materials: any) => {
            if (index > fileNames.length - 1) return;
            var model = new THREE.Mesh(geometry, materials)
            this.models.push(model);

            this.normalize(model);
            this.scene.add(model);

            model.position.x = index * 3;

            this.loadNextFile(fileNames, index + 1);
        });

    }

    private paint() {
        var now = Date.now();
        var delta = now - this.lastUpdate;
        this.lastUpdate = now;

        for (var i=0; i < this.models.length; i++) {
            this.models[i].rotation.x += (i+1) * 0.01;
            this.models[i].rotation.y += 0.02 / (i+1);

        }

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(() => this.paint());
    }

    public normalize(mesh: THREE.Mesh) {
        mesh.updateMatrix();
        mesh.applyMatrix(mesh.matrix);
        mesh.position.set(0, 0, 0);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(1, 1, 1);
        mesh.updateMatrix();
    }

}