import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoDetailModule } from './photo-detail/photo-detail.module';

@NgModule({
    imports: [
        CommonModule,
        PhotoListModule,
        PhotoModule,
        PhotoFormModule,
        PhotoDetailModule,
    ]
})

export class PhotosModule {}
