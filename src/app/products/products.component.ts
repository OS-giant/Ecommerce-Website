import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{

  des: any
  search_result: any = []
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

  searchform = new FormGroup({
    'searchdkey' : new FormControl(null)
  })

  submitForm(){
    const searchValue = this.searchform.get('searchdkey')?.value;
  console.log(searchValue);
  }

}
