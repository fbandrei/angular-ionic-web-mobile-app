import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Profile } from "./account.component";

@Injectable()
export class AccountService {

    constructor(public afStore: AngularFirestore) {}

    saveProfileData(data: Profile) {
        return new Promise<any>((resolve, reject) =>{
            this.afStore
                .collection("ProfileData")
                .add(data)
                .then(res => {
                    resolve(res);
                    console.log('Profile Data stored' + res);
                }, err => reject(err));
        });
    }
}