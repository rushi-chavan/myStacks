import { Timestamp } from '@angular/fire/firestore';

export interface Bills {
  docID?: string;
  invoiceNumber?: number;
  billingpartyName?: string;
  billAmount?: number;
  deliveryDate?: Timestamp;
}
