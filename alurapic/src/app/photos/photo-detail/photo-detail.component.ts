import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo';
import { PhotoComment } from '../photo-comment';
import { PhotoService } from '../photo.service';

@Component({
    templateUrl: './photo-detail.component.html'
})
export class PhotoDetailComponent implements OnInit {

    photo$: Observable<Photo> = null;
    photoId: number;


    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private alertService: AlertService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.idPhoto;
        this.photo$ = this.photoService.findById(this.photoId);
    }

    remove(): void {
        this.photoService.removePhoto(this.photoId).subscribe(
            () => {
                this.alertService.success('photo removed');
                this.router.navigate(['']);
            },
            err =>
                this.alertService.warning('could not delete the photo')
        );
    }
}
