import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, addDoc, doc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../inventory/product-dialog/product-dialog.component';
import { Bills } from './Bills';


@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  inventoryID: string;
  bills: Observable<Bills[]>;
  billsColumn: String[];
  productsColRef: any;
  
  
  constructor(private store: Firestore, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.inventoryID = 'IIg2g4EKZKVszwPJrGx1';
    this.productsColRef = collection(store, 'inventories', this.inventoryID, 'bills');

    this.bills = collectionData(this.productsColRef, { idField: 'docID' });
    this.billsColumn = ['invoiceNumber', 'billingpartyName', 'billAmount', 'deliveryDate', 'printBill', 'deleteBill'];
  }


  newBill(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { productsColRef: this.productsColRef },
    });
  }

  ngOnInit(): void {
  }

}
