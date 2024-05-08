import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscountRequest, IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { HttpClient } from '@angular/common/http';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {IProductRequest} from "../../interfaces/product/product.interface";
import {collection, DocumentData} from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts` };

  private discountCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore,
  ) {
    this.discountCollection = collection(this.afs, 'discounts');
  }

  getAllFirebase() {
    return collectionData(this.discountCollection, { idField: 'id' });
  }

  createFirebase(discount: IDiscountRequest) {
    return addDoc(this.discountCollection, discount);
  }

  updateFirebase(discount: IDiscountRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(categoryDocumentReference, { ...discount });
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

  getOneFirebase(id: string | null) {
    const categoryDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

}
