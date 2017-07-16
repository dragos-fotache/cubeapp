import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

import { Graphics } from './model/Graphics';

import * as THREE from 'three';
import * as ColladaLoader from 'three-collada-loader';

@Component({
    selector: 'graphics',
    templateUrl: './graphics.component.html',
    styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
    @ViewChild('myCanvas')
    canvasRef: ElementRef;

    private lastUpdate;

    private graphics: Graphics;

    private models: Array<THREE.Mesh> = new Array<THREE.Mesh>();

    private flagLoaded: boolean = false;

    constructor(private ngZone: NgZone) {
    }

    ngOnInit() {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                // console.log("hidden");
            } else {
                // console.log("visible");
                this.lastUpdate = Date.now();
            }
        });

        this.lastUpdate = Date.now();

        var fileNames = ['assets/cube1.json', 'assets/cube2.json', 'assets/cube3.json'];
        this.loadFiles(fileNames, () => {
            this.graphics = new Graphics(this.models);
            this.graphics.hookRenderer(this.canvasRef.nativeElement);
            this.ngZone.runOutsideAngular(() => this.paint());
        });

    }

    private loadFiles(fileNames: string[], callback) {

        var loader: THREE.JSONLoader = new THREE.JSONLoader();
        var models = this.models;

        function loadNextFile(fileNames: string[], index: number) {

            loader.load(fileNames[index], (geometry: any, materials: any) => {

                var model = new THREE.Mesh(geometry, materials)
                models.push(model);

                if (index > fileNames.length - 2) {
                    callback();
                    return;
                }

                loadNextFile(fileNames, index + 1);
            });

        }

        loadNextFile(fileNames, 0);

    }

    public normalize(mesh: THREE.Mesh) {
        mesh.updateMatrix();
        mesh.applyMatrix(mesh.matrix);
        mesh.position.set(0, 0, 0);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(1, 1, 1);
        mesh.updateMatrix();
    }

    public startAction(action: string) {
        this.graphics.startRotation(action);
    }

    private paint() {
        var now = Date.now();
        var delta = now - this.lastUpdate;
        this.lastUpdate = now;

        this.graphics.update(delta);
        this.graphics.render();

        requestAnimationFrame(() => this.paint());
    }

}