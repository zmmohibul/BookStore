import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cartItem';
import { BookType } from '../../../models/bookType';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book | undefined;
  bookImage =
    'https://images.unsplash.com/photo-1623697899811-f2403f50685e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJvb2slMjBwbGFjZWhvbGRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60';
  typePaperback = BookType.Paperback;
  typeHardcover = BookType.Hardcover;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (this.book) {
      for (let picture of this.book.pictures) {
        if (picture.isMain) {
          this.bookImage = picture.url;
        }
      }
    }
  }

  onAddToCartClick(book: Book, type: BookType) {
    console.log(book.id);
    console.log(type);
    let cartItem: CartItem = {
      id: book.id,
      name: book.name,
      type,
      pictureUrl: book.pictures.length ? book.pictures[0].url : '',
      quantity: 1,
      quantityInStock:
        type == BookType.Paperback
          ? book.paperbackQuantity
          : book.hardcoverQuantity,
      unitPrice:
        type == BookType.Paperback ? book.paperbackPrice : book.hardcoverPrice,
    };
    this.cartService.addToCart(book, type);
    console.log(cartItem);
    console.log(cartItem.type);

    this.cartService.cartItems$.subscribe({
      next: (cartItems) => {
        console.log(cartItems);
      },
    });
  }
}
