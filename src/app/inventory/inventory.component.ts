import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, addDoc, doc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Product } from './Product';

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

  constructor(private store: Firestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.inventoryID = 'IIg2g4EKZKVszwPJrGx1';
    this.productsColRef = collection(store, `inventories/${this.inventoryID}/products`);

    this.products = collectionData(this.productsColRef, { idField: 'docID' });
    this.productColumns = ['code', 'name', 'price', 'qty', 'update', 'delete'];
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        addDoc(this.productsColRef, result).then(() => {
          this._snackBar.open('Product added');
        });
    });
  }

  updateProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        updateDoc(this.docRef(result), result).then(() => {
          this._snackBar.open('Product updated');
        });
    });
  }

  deleteProduct(product: Product): void {
    deleteDoc(this.docRef(product)).then(() => {
      this._snackBar.open('Product deleted');
    });
  }

  docRef(product: Product): DocumentReference<Product> {
    return doc(this.store, `inventories/${this.inventoryID}/products/${product.docID}`);
  }

  ngOnInit(): void {}
}
