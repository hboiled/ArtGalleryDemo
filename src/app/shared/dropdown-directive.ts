import { Directive, HostBinding, HostListener, ElementRef } from "@angular/core";

@Directive ({
    selector: "[appDropdown]"
})

export class DropdownDirective {
    
    @HostBinding('class.open') isOpen = false;

    // to cancel dropdown at anywhere in the document, change the listener to document
    // set to trigger based on event
    @HostListener('document:click', ['$event']) mouseClick(event: Event) {       
        // this.isOpen = !this.isOpen;     
        //console.log("dropdown used")
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

    constructor (private elRef: ElementRef) {}
}