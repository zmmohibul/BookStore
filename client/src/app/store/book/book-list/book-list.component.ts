import {Component} from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  showAddToCartOptions = false;

  onAddToCartClick() {
    this.showAddToCartOptions = !this.showAddToCartOptions;
  }
}