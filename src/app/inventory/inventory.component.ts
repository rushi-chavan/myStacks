import { Component, OnInit } from '@angular/core';

export interface Products {
  code: number;
  name: string;
  price: number;
  stock: number;
}

let productsDummy: Products[] = [];

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products = productsDummy;
  productDetails: String[];
  constructor() {
    this.productDetails = ['code', 'name', 'price', 'stock'];
    this.products.push({ code: 1, name: 'Fogg', price: 149.99, stock: 35 });
    this.products.push({ code: 2, name: 'Yardley', price: 129.99, stock: 30 });
    this.products.push({ code: 3, name: 'Denver', price: 124.99, stock: 22 });
    this.products.push({ code: 4, name: 'Charlie', price: 174.99, stock: 47 });
  }

  ngOnInit(): void {}
}
