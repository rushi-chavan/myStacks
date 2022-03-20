import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, addDoc, doc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from '../inventory/product-dialog/product-dialog.component';
import { Bills } from './Bills';
import { FirebaseCrudService } from '../services/firebase-crud.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  inventoryID: string;
  bills: Observable<Bills[]>;
  billsColumn: String[];
  billsColRef: any;

  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialog: MatDialog) {
    this.inventoryID = 'IIg2g4EKZKVszwPJrGx1';
    this.billsColRef = collection(store, 'inventories', this.inventoryID, 'bills');

    this.bills = collectionData(this.billsColRef, { idField: 'docID' });
    this.billsColumn = ['invoiceNumber', 'billingpartyName', 'billAmount', 'deliveryDate', 'viewBill', 'printBill', 'deleteBill'];
  }

  newBill(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { billsColRef: this.billsColRef },
    });
  }

  viewBill(bill: Bills): void {}

  printBill(bill: Bills): void {}

  deleteBill(bill: Bills): void {
    this.crud.deleteDocument(this.billsColRef, bill);
  }

  ngOnInit(): void {}
}
