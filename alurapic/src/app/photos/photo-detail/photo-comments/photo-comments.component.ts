import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoComment } from '../../photo-comment';
import { PhotoService } from '../../photo.service';

@Component({
    selector: 'app-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId;
    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
            private photoService: PhotoService,
            private formBuilder: FormBuilder
        ) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', [Validators.required, Validators.maxLength(300)]]
        });
    }

    save() {
        const comment = this.commentForm.get('comment').value;

        this.comments$ = this.photoService.addComments(this.photoId, comment)
        .pipe(switchMap( () => this.photoService.getComments(this.photoId)))
        .pipe( tap( () => this.commentForm.reset()));
    }
}
