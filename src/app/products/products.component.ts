import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  des: any
  constructor(private api: ApiService, private cartService: CartService){

  }

  ngOnInit(): void {
    this.api.getProduct().subscribe( res => {
      this.productList = res
      this.productList.reverse()

      this.productList.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.price})        
      });
    })
  }

  public productList:any

  add_to_cart(item: any){
    this.cartService.addtoCart(item)
  }


}
