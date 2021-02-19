import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from './photo';
import { PhotoService } from './photo.service';

@Injectable({
    providedIn: 'root'
})
export class PhotoResolver implements Resolve<Observable<Photo[]>> {

    constructor(private photoService: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.photoService.listFromUserPaginated(route.params.userName, 1);
    }
}
