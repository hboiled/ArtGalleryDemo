import { Component } from "@angular/core";

@Component({
    selector: 'load-spinner',
    template: `
    <h3>Loading...</h3>
    <div class="lds-dual-ring"></div>
    `,
    styleUrls: ['./load-spinner.css']
})

export class LoadSpinner {
    
}