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

  inputValue: string = "";
  processedValue: any;
  des: any
  is_default: boolean = true
  search_result: any = []
  description_list:any = []
  name_list: any = []
  category_list: any = []

  constructor(private api: ApiService, private cartService: CartService){

  }

  ngOnInit(): void {
    this.api.getProduct().subscribe( res => {
      this.productList = res
      this.set_data_lists()
    })

    this.set_search_default()
  }

  public productList:any

  add_to_cart(item: any){
    this.cartService.addtoCart(item)
  }

  processInput() {
    this.is_default = false
    this.processedValue = this.inputValue;
    console.log(this.processedValue, '#val')

    this.set_search_result()
  }

  set_search_result() {
    for (let i = 0; i < this.search_result.length ; i++) {
      this.search_result[i] = null
    }

    for (let i = 0; i < this.productList.length ; i++) {
      if(this.description_list[i].toLowerCase().includes(this.processedValue.toLowerCase()) ||
         this.name_list[i].toLowerCase().includes(this.processedValue.toLowerCase()) ||
         this.category_list[i].toLowerCase().includes(this.processedValue.toLowerCase())){
         this.search_result[i] = this.productList[i]
      }
    }

    console.log(this.search_result, '#search_result')
  }

  set_data_lists(){
    for (let i = 0; i < this.productList.length ; i++) {
      this.description_list[i] = this.productList[i].description
      this.name_list[i] = this.productList[i].title
      this.category_list[i] = this.productList[i].category 
    }

    this.productList.reverse()
    this.description_list.reverse()
    this.name_list.reverse()
    this.category_list.reverse()

    this.productList.forEach((a: any) => {
      Object.assign(a, {quantity: 1, total: a.price})
    });
  }

  set_search_default() {
    if(this.is_default == true)
    for (let i = 0; i < this.productList.length ; i++) {
      this.search_result[i] = this.productList[i]
    }
  }
}
