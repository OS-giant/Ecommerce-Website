import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  public cart_item_list:any=[]
  public product_list = new BehaviorSubject<any>([])
  
  constructor() { }

  getProducts() {
    return this.product_list.asObservable()
  }

  setProduct(product: any) {
    this.cart_item_list.push(...product)
    this.product_list.next(product)
  }

  addtoCart(product: any) {
    this.cart_item_list.push(product)
    this.product_list.next(this.cart_item_list)
    this.getTotalPrice()

    console.log(this.cart_item_list)
  }

  getTotalPrice() {
    let grandTotal = 0
    this.cart_item_list.map((a: any) => {
      grandTotal += a.total
    })

    return grandTotal
  }

  removeCartItem(product: any) {
    this.cart_item_list.map((a: any, index:any) => {
      if (product.id === a.id)
        this.cart_item_list.splice(index, 1)
    })

    this.product_list.next(this.cart_item_list)
  }

  removeAllCart() {
    this.cart_item_list = []
    this.product_list.next(this.cart_item_list)
  }
}
