import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  @Input() book: Book | undefined;
}
