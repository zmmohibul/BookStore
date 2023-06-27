import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book | undefined;
  bookImage =
    'https://images.unsplash.com/photo-1623697899811-f2403f50685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2slMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';

  ngOnInit(): void {
    if (this.book) {
      for (let picture of this.book.pictures) {
        if (picture.isMain) {
          this.bookImage = picture.url;
        }
      }
    }
  }
}
