import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FirebaseCrudService } from '../services/firebase-crud.service';
import { Bills } from './Bills';
import { BillsDialogComponent } from './bills-dialog/bills-dialog.component';

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
    this.bills = collectionData(query(this.billsColRef, orderBy('deliveryDate', 'desc')), { idField: 'docID' });
    this.billsColumn = ['invoiceNumber', 'billingpartyName', 'billAmount', 'deliveryDate', 'viewBill', 'printBill', 'deleteBill'];
  }

  newBill(): void {
    const dialogRef = this.dialog.open(BillsDialogComponent, {
      width: '50vw',
      data: { billsColRef: this.billsColRef },
    });
  }

  viewBill(bill: Bills): void {
    const dialogRef = this.dialog.open(BillsDialogComponent, {
      width: '50vw',
      data: {
        billsColRef: this.billsColRef,
        bill: bill,
      },
    });
  }

  printBill(bill: Bills): void {}

  deleteBill(bill: Bills): void {
    this.crud.deleteDocument(this.billsColRef, bill);
  }

  ngOnInit(): void {}
}
