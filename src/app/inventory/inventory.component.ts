import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { collection, collectionData, doc, DocumentReference, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../services/firebase-crud.service';
import { Product } from './Product';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryComponent implements OnInit {
  inventoryID: string;
  private productsColRef: any;
  products: Observable<Product[]>;
  productColumns: String[];

  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
    this.inventoryID = 'IIg2g4EKZKVszwPJrGx1';
    this.productsColRef = collection(store, 'inventories', this.inventoryID, 'products');

    this.products = collectionData(this.productsColRef, { idField: 'docID' });
    this.productColumns = ['code', 'name', 'company', 'category', 'price', 'qty', 'update', 'delete'];
  }

  addProduct(): void {
    this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { productsColRef: this.productsColRef },
    });
  }

  updateProduct(product: Product): void {
    this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { product: { ...product }, productsColRef: this.productsColRef },
    });
  }

  deleteProduct(product: Product): void {
    this.crud.deleteDocument(this.productsColRef, product);
  }

  docRef(product: Product): DocumentReference<Product> {
    return doc(this.store, 'inventories', this.inventoryID, 'products', product.docID ? product.docID : '');
  }

  ngOnInit(): void {}
}
