import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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
  colRef!: any;
  companies: Set<string>;
  categories: Set<string>;
  companyDropdown: string[];
  categoryDropdown: string[];

  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    if (data.product) this.newProduct = data.product;
    else this.newProduct = {};
    this.colRef = data.productsColRef;
    let dropdownValues = crud.getUniqueValues(this.colRef, ['company', 'category']);
    this.companies = dropdownValues.get('company')!;
    this.categories = dropdownValues.get('category')!;
    this.companyDropdown = Array.from(this.companies);
    this.categoryDropdown = Array.from(this.categories);
  }

  ngOnInit(): void {}

  add(): void {
    if (this.crud.addDocument(this.colRef, this.newProduct)) this.dialogRef.close();
  }
  update(): void {
    if (this.crud.updateDocument(this.colRef, this.newProduct)) this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  doFilter(field: string): void {
    switch (field) {
      case 'company':
        this.companyDropdown = Array.from(this.companies).filter((v) => v.toLowerCase().includes(this.newProduct.company!.toLowerCase()));
        break;
      case 'category':
        this.categoryDropdown = Array.from(this.categories).filter((v) => v.toLowerCase().includes(this.newProduct.category!.toLowerCase()));
        break;
      default:
        console.log('Invalid field to filter');
        break;
    }
  }
}
