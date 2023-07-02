import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
import {User} from '../models/user';
import {CartItem} from '../models/cartItem';
import {ToastrService} from 'ngx-toastr';
import {BooksService} from './books.service';
import {Book} from '../models/book/book';
import {BookType} from '../models/bookType';

enum CartOperation {
  Increment = 'Increment',
  Decrement = 'Decrement',
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSource = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartSource.asObservable();

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService
  ) {
  }

  loadCart() {
    const cartString = localStorage.getItem('cart');
    if (!cartString) {
      return;
    }

    const cartItems: CartItem[] = JSON.parse(cartString);
    this.cartSource.next(cartItems);

  }

  emptyCart() {
    this.cartSource.next([]);
    localStorage.setItem('cart', JSON.stringify([]));
  }

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

    let cartItems: CartItem[] = this.getCartFromLocalStorage();

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
  }

  removeItemFromCart(cartItem: CartItem) {
    let itemToDelete = this.getItemFromCartInLocalStorage(cartItem);
    if (!itemToDelete) {
      this.toastr.error(
        'The cart was updated on some other page. Please reload the page for the updated cart',
        'Error!!!'
      );
      return;
    }

    let cartItems: CartItem[] = this.getCartFromLocalStorage();
    cartItems = cartItems.filter((item) => {
      if (item.id !== cartItem.id) {
        return item;
      }

      if (item.id === cartItem.id && item.type !== cartItem.type) {
        return item;
      }

      return;
    });

    this.cartSource.next(cartItems);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    this.toastr.error(`Item Removed from Cart.`);
  }

  getCartTotal() {
    const cart = this.getCartFromLocalStorage();
    let total = 0;
    for (let item of cart) {
      total += item.quantity * item.unitPrice;
    }

    return total;
  }

  private getCartFromLocalStorage(): CartItem[] {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
      return JSON.parse(cartString);
    }

    return [];
  }

  private getItemFromCartInLocalStorage(cartItem: CartItem): CartItem | null {
    let cart = this.getCartFromLocalStorage();

    for (let item of cart) {
      if (item.id === cartItem.id && item.type === cartItem.type) {
        return item;
      }
    }

    return null;
  }

  incrementCartItemQuantity(cartItem: CartItem) {
    let itemToUpdate = this.getItemFromCartInLocalStorage(cartItem);
    if (!itemToUpdate) {
      this.toastr.error(
        'The cart was updated on some other page. Please reload the page for the updated cart',
        'Error!!!'
      );
      return;
    }

    if (itemToUpdate.quantity === itemToUpdate.quantityInStock) {
      this.toastr.error('Desired quantity is not available in stock.');
      return;
    }

    this.updateCartItem(itemToUpdate, CartOperation.Increment);
  }

  decrementCartItemQuantity(cartItem: CartItem) {
    let itemToUpdate = this.getItemFromCartInLocalStorage(cartItem);
    if (!itemToUpdate) {
      this.toastr.error(
        'The cart was updated on some other page. Please reload the page for the updated cart',
        'Error!!!'
      );
      return;
    }

    if (itemToUpdate.quantity === 1) {
      return;
    }

    this.updateCartItem(itemToUpdate, CartOperation.Decrement);
  }

  private updateCartItem(cartItem: CartItem, operation: CartOperation) {
    let cartItems: CartItem[] = this.getCartFromLocalStorage();
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
  }
}
