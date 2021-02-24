import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[showIfLogged]',
})
export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        !this.userService.isLogged()
            && this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
}
