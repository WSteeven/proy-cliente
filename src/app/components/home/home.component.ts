import { Component, OnInit } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Bienvenido a la red social';
    }

    ngOnInit() {
        console.log('Home cargado');
    }
}
