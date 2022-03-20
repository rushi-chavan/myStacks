import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { Bills } from '../Bills';

@Component({
  selector: 'app-add-bill-dialog',
  templateUrl: './bills-dialog.component.html',
  styleUrls: ['./bills-dialog.component.css'],
})
export class BillsDialogComponent implements OnInit {
  newBill!: Bills;
  billsColRef!: any;
  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialogRef: MatDialogRef<BillsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.bill) this.newBill = data.bill;
    else this.newBill = {};
    this.billsColRef = data.billsColRef;
    console.log(this.newBill.deliveryDate);
  }

  ngOnInit(): void {}

  add(): void {
    this.crud.addDocument(this.billsColRef, this.newBill);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
