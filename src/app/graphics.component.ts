import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnChanges } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

import { Graphics } from './model/Graphics';

@Component({
    selector: 'graphics',
    templateUrl: './graphics.component.html',
    styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
    @ViewChild('myCanvas') 
    canvasRef: ElementRef;

    @Input()
    buttonWasClicked: boolean;

    @Output()
    movementEnded = new EventEmitter();

    private lastUpdate;

    private graphics: Graphics;

    constructor(private ngZone: NgZone) {
    }

    ngOnInit() {

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                console.log("hidden");
            } else {
                console.log("visible");
                this.lastUpdate = Date.now();
            }
        });

        this.lastUpdate = Date.now();

        this.graphics = new Graphics();

        this.graphics.hookRenderer(this.canvasRef.nativeElement);
        
        this.ngZone.runOutsideAngular(() => this.paint());
    }

    private paint() {
        var now = Date.now();
        var dt = now - this.lastUpdate;
        this.lastUpdate = now;

        this.graphics.update(this.buttonWasClicked);
        this.graphics.render();

        requestAnimationFrame(() => this.paint());
    }

}