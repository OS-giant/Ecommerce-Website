import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  public products: any = []
  public grandTotal: number = 0

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res)=>{
      this.products = res
      this.grandTotal = this.cartService.getTotalPrice()
    })
  }

  removeItem(item: any){
    if (confirm('Are you sure??'))
      this.cartService.removeCartItem(item)
      //alert('the item was deleted successfully')
  }

  cleanCart() {
    if (confirm('Are you sure??'))
      this.cartService.removeAllCart()
      //alert('your cart is reset successfully')
  }
}
