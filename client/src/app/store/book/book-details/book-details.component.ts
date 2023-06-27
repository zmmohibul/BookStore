import {Component, OnInit} from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../../services/books.service';
import {Book} from '../../../models/book/book';
import {ToastrService} from 'ngx-toastr';
import {delay} from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  loading = false;
  book: Book | undefined;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.loadBook();

    this.galleryOptions = [
      {
        width: '100%',
        height: '650px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
      },
    ];
  }

  loadBook() {
    this.loading = true;
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.booksService.getBookById(id).subscribe({
      next: (response) => {
        this.book = response;
        this.galleryImages = this.getGalleryImages();
        this.loading = false;
        // this.book.description = this.book.description.replace('\n', '<br>');
        console.log(this.book.description);
      },
    });
  }

  getGalleryImages() {
    if (!this.book) return [];
    const imageUrls = [];
    
    for (const picture of this.book.pictures) {
      if (picture.isMain) {
        imageUrls.push({
          small: picture.url,
          medium: picture.url,
          big: picture.url,
        });
      }
    }

    for (const picture of this.book.pictures) {
      if (!picture.isMain) {
        imageUrls.push({
          small: picture.url,
          medium: picture.url,
          big: picture.url,
        });
      }
    }

    if (!this.book.pictures.length) {
      imageUrls.push({
        small:
          'https://images.unsplash.com/photo-1623697899811-f2403f50685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2slMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        medium:
          'https://images.unsplash.com/photo-1623697899811-f2403f50685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2slMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        big: 'https://images.unsplash.com/photo-1623697899811-f2403f50685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2slMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      });
    }
    console.log(imageUrls);
    return imageUrls;
  }
}
