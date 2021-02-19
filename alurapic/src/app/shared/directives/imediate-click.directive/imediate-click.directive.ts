import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[imediateClick]',
})
export class ImediateClickDirective implements OnInit {

    constructor(
        private el: ElementRef,
        private platformDetector: PlatformDetectorService
    ) {}

    ngOnInit(): void {
        this.platformDetector.isPlatformBrowser &&
            this.el.nativeElement.click();
    }
}
