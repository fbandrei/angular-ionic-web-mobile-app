import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular'; 
import { CATEGORIES } from '@nx-little-manufacturer/core/common';

@Component({
    templateUrl: 'sell.modal.html',
    styleUrls: ['sell.modal.scss'],
    selector: 'sell-modal'
})
export class SellModal implements OnInit {

  // https://www.remotestack.io/ionic-upload-image-to-firebase-storage-with-progress-bar/

  sellForm: FormGroup;
  categories = CATEGORIES;
  uploadedFiles: File[] = [];
  imgURLs: string[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.sellForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),  
      'description': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'category': new FormControl(null, [Validators.required]),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      'files': new FormControl(null)
    }, { updateOn: "blur" });
  }

  get title() {
    return this.sellForm.get("title");
  }

  get description() {
    return this.sellForm.get("description");
  }

  get email() {
    return this.sellForm.get("email");
  }

  get category() {
    return this.sellForm.get("category");
  }

  get phoneNumber() {
    return this.sellForm.get("phoneNumber");
  }

  get files() {
    return this.sellForm.get("files");
  }

  async dismiss() {
    await this.modalController.dismiss();

  }

  addPost() {
    if (this.sellForm.valid) {
      console.log('Form submitted!');
      console.log(this.sellForm.value);
      console.log(this.sellForm.get('title'));
    } else {

    }
  }

  fileUpload(event: FileList) {
    this.uploadedFiles = [];
    this.imgURLs = [];
    for(let i = 0; i < event.length; i++) {
      this.uploadedFiles[i] = event.item(i);
    }
    this.uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
        this.imgURLs.push(URL.createObjectURL(blob));
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    });

  }


  onRenderItems(event: CustomEvent) {
    let draggedItem = this.uploadedFiles.splice(event.detail.from, 1)[0];
    this.uploadedFiles.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
  }
}