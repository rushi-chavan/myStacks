import { Component, OnInit, Inject } from '@angular/core';
import { addDoc, doc, DocumentReference, Firestore, updateDoc, CollectionReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bills } from '../Bills';

@Component({
  selector: 'app-add-bill-dialog',
  templateUrl: './bills-dialog.component.html',
  styleUrls: ['./bills-dialog.component.css'],
})
export class BillsDialogComponent implements OnInit {
  newBill!: Bills;
  billsColRef!: any;
  constructor(private store: Firestore, public dialogRef: MatDialogRef<BillsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    if (data.bill) this.newBill = data.bill;
    else this.newBill = {};
    this.billsColRef = data.billssColRef;
  }

  ngOnInit(): void {}

  add(): void {
    addDoc(this.billsColRef, this.newBill)
      .then(() => {
        this._snackBar
          .open('Bill added')
          .afterOpened()
          .subscribe(() => {
            this.dialogRef.close();
          });
      })
      .catch((e) => {
        this._snackBar.open('Error: Cannot add bill');
        console.log(e.message);
      });
  }

  

  cancel(): void {
    this.dialogRef.close();
  }

  docRef(product: Bills): DocumentReference<Bills> {
    return doc(this.store, this.billsColRef.path, `${product.docID}`);
  }
}
