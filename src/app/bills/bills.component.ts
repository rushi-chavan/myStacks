import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, addDoc, doc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../inventory/product-dialog/product-dialog.component';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  productsColRef: any;
  dialog: any;

  constructor() { }

  newBill(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { productsColRef: this.productsColRef },
    });
  }

  ngOnInit(): void {
  }

}
