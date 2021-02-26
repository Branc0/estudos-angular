import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API_URL = 'http://localhost:3000/';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    constructor(private httpClient: HttpClient) {
    }

    listFromUser(userName: string) {
        return this.httpClient.get<Photo[]>(API_URL + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.httpClient.get<Photo[]>(API_URL + userName + '/photos', { params });
    }

    upload(description: string, allowComments: boolean, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);
        return this.httpClient.post(API_URL + 'photos/upload', formData);
    }

    findById(id: number) {
        return this.httpClient.get<Photo>(API_URL + 'photos/' + id);
    }

    getComments(id: number) {
        return this.httpClient.get<PhotoComment[]>(
            API_URL + 'photos/' + id + '/comments');
    }

    addComments(id: number, commentText: string) {
        return this.httpClient.post(
            API_URL + 'photos/' + id + '/comments', { commentText });
    }

    removePhoto(photoId: number) {
        return this.httpClient.delete(API_URL + 'photos/' + photoId);
    }

    like(id: number) {
        this.httpClient.post(API_URL + '/photos/' + id + '/like', {}, { observe: 'response' })
            .pipe(map(res => true))
            .pipe(catchError(err => err.status == '304' ? of(false) : throwError(err)));
    }
}
