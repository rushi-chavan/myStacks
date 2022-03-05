import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent implements OnInit {
  newProduct!: Product;
  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {
    if (product) this.newProduct = product;
    else this.newProduct = {};
  }

  ngOnInit(): void {}

  onAdd(): void {
    this.dialogRef.close(this.newProduct);
  }

  onUpdate(): void {
    this.dialogRef.close(this.product);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
