import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo';

@Pipe({
    name: 'filterByDescription'
})
export class FilterByDescription implements PipeTransform {
    transform(photos: Photo[], description: string = '') {
        description = description.trim().toLowerCase();

        if (description) {
            return photos.filter(photo =>
                photo.description.toLowerCase().includes(description)
            );
        } else {
            return photos;
        }
    }
}
