import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, addDoc, doc, DocumentReference, deleteDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Product } from './Product';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { FirebaseCrudService } from '../services/firebase-crud.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InventoryComponent implements OnInit {
  inventoryID: string;
  private productsColRef: any;
  products: Observable<Product[]>;
  productColumns: String[];
  // dataSource = new MatTableDataSource(this.products);

  constructor(private store: Firestore, private crud: FirebaseCrudService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {
    this.inventoryID = 'IIg2g4EKZKVszwPJrGx1';
    this.productsColRef = collection(store, 'inventories', this.inventoryID, 'products');

    this.products = collectionData(this.productsColRef, { idField: 'docID' });
    this.productColumns = ['code', 'name', 'price', 'qty', 'update', 'delete'];
  }

  addProduct(): void {
    this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { productsColRef: this.productsColRef },
    });
  }

  updateProduct(product: Product): void {
    this.dialog.open(ProductDialogComponent, {
      width: '50vw',
      data: { product: { ...product }, productsColRef: this.productsColRef },
    });
  }

  deleteProduct(product: Product): void {
    this.crud.deleteDocument(this.productsColRef, product);
  }

  docRef(product: Product): DocumentReference<Product> {
    return doc(this.store, 'inventories', this.inventoryID, 'products', product.docID ? product.docID : '');
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  // ngAfterViewInit() {
  //   this.products.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {}
}
