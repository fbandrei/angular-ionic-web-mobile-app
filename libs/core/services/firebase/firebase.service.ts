import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class FirebaseService {
  
  constructor(private angularFirestore: AngularFirestore) {

    const postData = [
      {
        userID: '1',
        title: 'Fresh Vegetables',
        category: 'Vegetables',
        description: 'We sell organic and fresh vegetables: tomates, potatos, corn, beans'
      }
    ]
  }

}
