import {Directive, ElementRef, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Directive({
    selector: '[html]'
})
export class HtmlDirective {

    constructor(private ref: ElementRef, private san: DomSanitizer) {
    }

    @Input() set html(s: string) {
        //this.ref.nativeElement.innerHTML = this.san.bypassSecurityTrustHtml(s)
        this.ref.nativeElement.innerHTML = s
    }

}
