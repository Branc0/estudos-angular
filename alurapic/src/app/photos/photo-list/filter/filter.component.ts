import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-filter',
    templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

    filterSubject: Subject<string> = new Subject<string>();
    @Output() onType = new EventEmitter<string>();
    @Input() filter = '';
    
    constructor() { }

    ngOnInit(): void {
        this.filterSubject
        .pipe(debounceTime(300))
        .subscribe(filter => this.onType.emit(filter));
    }

    ngOnDestroy(): void {
        this.filterSubject.unsubscribe();
    }
}
