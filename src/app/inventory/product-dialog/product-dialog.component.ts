import { Component, OnInit, Inject } from '@angular/core';
import { addDoc, doc, DocumentReference, Firestore, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  newProduct!: Product;
  productsColRef!: any;
  constructor(private store: Firestore, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    if (data.product) this.newProduct = data.product;
    else this.newProduct = {};
    this.productsColRef = data.productsColRef;
  }

  ngOnInit(): void {}

  add(): void {
    addDoc(this.productsColRef, this.newProduct)
      .then(() => {
        this._snackBar
          .open('Product added')
          .afterOpened()
          .subscribe(() => {
            this.dialogRef.close();
          });
      })
      .catch((e) => {
        this._snackBar.open('Error: Cannot add product');
        console.log(e.message);
      });
  }

  update(): void {
    updateDoc(this.docRef(this.newProduct), this.newProduct)
      .then(() => {
        this._snackBar
          .open('Product updated')
          .afterOpened()
          .subscribe(() => {
            this.dialogRef.close();
          });
      })
      .catch((e) => {
        this._snackBar.open('Error: Cannot update product');
        console.log(e.message);
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  docRef(product: Product): DocumentReference<Product> {
    return doc(this.store, this.productsColRef.path, `${product.docID}`);
  }
}
