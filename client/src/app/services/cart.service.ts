import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { User } from '../models/user';
import { CartItem } from '../models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from './books.service';
import { Book } from '../models/book/book';
import { BookType } from '../models/bookType';

enum CartOperation {
  Increment = 'Increment',
  Decrement = 'Decrement',
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSource = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartSource.asObservable();

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  addToCart(book: Book, bookType: BookType) {
    let quantityInStock =
      bookType == BookType.Paperback
        ? book.paperbackQuantity
        : book.hardcoverQuantity;

    if (!quantityInStock) {
      this.toastr.error('Desired quantity not available in stock');
      return;
    }

    let cartItem: CartItem = {
      id: book.id,
      name: book.name,
      type: bookType,
      pictureUrl: book.pictures.length ? book.pictures[0].url : '',
      quantity: 1,
      quantityInStock,
      unitPrice:
        bookType == BookType.Paperback
          ? book.paperbackPrice
          : book.hardcoverPrice,
    };

    this.cartItems$.pipe(take(1)).subscribe({
      next: (cartItems) => {
        for (let item of cartItems) {
          if (item.id === cartItem.id && item.type === cartItem.type) {
            this.toastr.success('Book is already in cart');
            return;
          }
        }
        cartItems = [...cartItems, cartItem];

        this.cartSource.next(cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));

        this.toastr.success('Book added to cart.');
      },
    });
  }

  incrementCartItemQuantity(cartItem: CartItem) {
    if (cartItem.quantity === cartItem.quantityInStock) {
      this.toastr.error('Desired quantity is not available in stock.');
      return;
    }

    this.updateCartItem(cartItem, CartOperation.Increment);
  }

  decrementCartItemQuantity(cartItem: CartItem) {
    if (cartItem.quantity === 1) {
      return;
    }

    this.updateCartItem(cartItem, CartOperation.Decrement);
  }

  updateCartItem(cartItem: CartItem, operation: CartOperation) {
    this.cartItems$.pipe(take(1)).subscribe({
      next: (cartItems) => {
        for (let item of cartItems) {
          if (item.id === cartItem.id && item.type === cartItem.type) {
            if (operation === CartOperation.Increment) {
              item.quantity++;
            }

            if (operation === CartOperation.Decrement) {
              item.quantity--;
            }

            this.cartSource.next(cartItems);
            localStorage.setItem('cart', JSON.stringify(cartItems));

            return;
          }
        }
      },
    });
  }

  removeItemFromCart(cartItem: CartItem) {
    this.cartItems$.pipe(take(1)).subscribe({
      next: (itemList) => {
        itemList = itemList.filter((item) => {
          if (item.id !== cartItem.id) {
            return item;
          }

          if (item.id === cartItem.id && item.type !== cartItem.type) {
            return item;
          }

          return;
        });

        this.cartSource.next(itemList);
        localStorage.setItem('cart', JSON.stringify(itemList));

        this.toastr.error(`Item Removed from Cart.`);
      },
    });
  }
}
