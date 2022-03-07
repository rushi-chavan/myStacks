import { Component, OnInit, Inject } from '@angular/core';
import { addDoc, doc, DocumentReference, Firestore, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { Product } from '../Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  newProduct!: Product;
  productsColRef!: any;
  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    if (data.product) this.newProduct = data.product;
    else this.newProduct = {};
    this.productsColRef = data.productsColRef;
  }

  ngOnInit(): void {}

  add(): void {
    if (this.crud.addDocument(this.productsColRef, this.newProduct)) this.dialogRef.close();
  }
  update(): void {
    if (this.crud.updateDocument(this.productsColRef, this.newProduct)) this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
