import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { GraphicsComponent } from './graphics.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('graphics')
    graphics: GraphicsComponent;

    title = 'app';

    commandUp() {
        this.graphics.startAction('up');
    }
    commandUpi() {
        this.graphics.startAction('upi');
    }
    commandRight() {
        this.graphics.startAction('right');
    }
    commandRighti() {
        this.graphics.startAction('righti');
    }
}
