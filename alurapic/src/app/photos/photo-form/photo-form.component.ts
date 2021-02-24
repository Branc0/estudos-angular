
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../photo.service';

@Component({
    templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

    photoForm: FormGroup;
    file: File;
    preview: string = null;

    constructor(
        private formBuilder: FormBuilder,
        private photoService: PhotoService,
        private router: Router) {}

    ngOnInit(): void {
        this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true],
        });
    }

    upload() {
        const description = this.photoForm.get('description').value;
        const allowComents = this.photoForm.get('allowComments').value;
        console.log(this.file);
        this.photoService
            .upload(description, allowComents, this.file)
            .subscribe(() => this.router.navigate(['']));
    }

    fileUploaded(e) {
        this.file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => this.preview = event.target.result;
        reader.readAsDataURL(this.file);
    }
}
