import { Injectable } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCrudService {
  isSuccess: boolean;
  constructor(private store: Firestore, private _snackBar: MatSnackBar) {
    this.isSuccess = false;
  }

  addDocument(colRef: CollectionReference, data: any): boolean {
    addDoc(colRef, data)
      .then(() => {
        this.showSnackbar('Successfully added').subscribe(() => {
          this.isSuccess = true;
        });
      })
      .catch((e) => {
        this.showSnackbar('Failed to add').subscribe(() => {
          this.isSuccess = false;
        });
      });
    return this.isSuccess;
  }

  updateDocument(colRef: CollectionReference, data: any): boolean {
    updateDoc(this.getDocumentReference(colRef, data), data)
      .then(() => {
        this.showSnackbar('Successfully updated').subscribe(() => {
          this.isSuccess = true;
        });
      })
      .catch((e) => {
        this.showSnackbar('Failed to add').subscribe(() => {
          this.isSuccess = false;
        });
      });
    return this.isSuccess;
  }

  deleteDocument(colRef: CollectionReference, data: any): boolean {
    deleteDoc(this.getDocumentReference(colRef, data))
      .then(() => {
        this.showSnackbar('Successfully deleted').subscribe(() => {
          this.isSuccess = true;
        });
      })
      .catch((e) => {
        this.showSnackbar('Failed to add').subscribe(() => {
          this.isSuccess = false;
        });
      });
    return this.isSuccess;
  }

  getDocumentReference(colRef: CollectionReference, data: any): DocumentReference<any> {
    return doc(this.store, colRef.path, data.docID);
  }

  showSnackbar(message: string, action?: string): Observable<any> {
    return this._snackBar.open(message, action ? action : '').afterOpened();
  }
}
