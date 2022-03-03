import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';

export interface Product {
  code: number;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  products: Observable<Product[]>;
  productDetails: String[];

  constructor(private store: Firestore) {
    const productCollection = collection(store, 'om-agency/products/123/');
    this.products = collectionData(productCollection) as Observable<Product[]>;
    console.log(this.products);
    this.productDetails = ['code', 'name', 'price', 'stock'];
  }

  ngOnInit(): void {}
}
