import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ApiService } from './../services/api.service'

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})

export class ProductInfoComponent implements OnInit{

  constructor(private router: ActivatedRoute,
    private api_service: ApiService, private cartService:CartService) { }

  product_list: any = []
  parameter_id: any
  product_to_show: any

  ngOnInit(): void {
    this.parameter_id = this.router.snapshot.paramMap.get('id')
    console.log(this.parameter_id, 'getparamid#')

    this.get_product_list()
  }

  get_product_list() {
    this.api_service.getProduct().subscribe((res) => {
      this.product_list = res
      this.product_list.reverse()

      this.product_list.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.price})        
      });
      
      console.log(this.product_list, '#info')
    })
  }

  add_to_cart(item: any){
    this.cartService.addtoCart(item)
  }

}