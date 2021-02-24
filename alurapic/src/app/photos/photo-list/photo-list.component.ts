import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];
  userName: string;
  filter = '';
  hasMore = true;
  currentPage = 1;


  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos;
    });
  }

  buscarMais(): void {
    this.currentPage++;
    this.filter = '';
    this.photoService.listFromUserPaginated(this.userName, this.currentPage).subscribe(
      data => {
        this.photos = this.photos.concat(data);
        if (!data.length) {
          this.hasMore = false;
        }
      }
    );
  }
}
