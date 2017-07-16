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

    doCommand(command: string) {
        this.graphics.startAction(command);
    }
   
}
