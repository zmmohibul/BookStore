import { Component } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
  showAddToCartOptions = false;

  onAddToCartClick() {
    this.showAddToCartOptions = !this.showAddToCartOptions;
  }
}
