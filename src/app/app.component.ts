import {Component} from '@angular/core';
import {Utils} from '@ngdbtools/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'dbts-angular-tools';

    constructor() {
        this.title = this.title + Utils.secondsBetween(new Date(), new Date(2018, 7, 29));
    }
}
