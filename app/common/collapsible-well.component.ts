import { Component } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div (click)="toggleBody()" class="well pointable">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>
            <ng-content *ngIf="showBody" select="[well-body]"></ng-content>
        </div>
    `
})
export class CollapsibleWellComponent {
    private showBody: boolean = false;

    toggleBody() {
        this.showBody = !this.showBody;
    }
}
