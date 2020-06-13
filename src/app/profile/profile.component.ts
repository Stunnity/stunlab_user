import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TransferDataService } from '../services/shared-data/transfer-data.service';
import { empty, equal } from 'src/utils/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/user-data/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateForm: FormGroup;
  user: object = {};
  private avatarUrl: string = 'https://ui-avatars.com/api/?name=';

  constructor(private transferService: TransferDataService, private userService: UserDataService) {
    this.getUser();
    this.updateForm = new FormGroup({
      username: new FormControl({ disabled: true, value: "" }, [
        Validators.required,
        Validators.minLength(5)]),
      email: new FormControl({ disabled: true, value: "" }, [
        Validators.required,
        Validators.email
      ],
      ),
      phone: new FormControl({ disabled: false, value: "" }, [
        Validators.minLength(10),
        Validators.maxLength(14),
      ]),
      firstName: new FormControl({ disabled: false, value: "" }, [
      ],
      ),
      secondName: new FormControl({ disabled: false, value: "" }, [
      ]),
      gender: new FormControl({ disabled: false, value: "" },
      ),
      joined_at: new FormControl({ disabled: true, value: "" }),
    });
  }
  isLoading: boolean = false;
  ngOnInit() {

  }
  updateUser() {
    this.isLoading = true
    this.userService.updateUser(this.updateForm.value).subscribe(res => {
      this.isLoading = false;
      this.getUser();
    })
  }
  imageToShow: any;
  isImageLoading: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService() {
    this.isImageLoading = true;
    let url = this.avatarUrl + this.updateForm.get('username').value;
    this.userService.getImage(url).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }
  getUser() {
    this.transferService.getUser().subscribe(res => {
      if (empty(res))
        return;
      this.user = res;
      this.updateForm.get('username').setValue(res["username"])
      this.updateForm.get('email').setValue(res["email"])
      this.updateForm.get('gender').setValue(res["gender"])
      this.updateForm.get('phone').setValue(res["phone"])
      this.updateForm.get('firstName').setValue(res["firstName"])
      this.updateForm.get('secondName').setValue(res["secondName"])
      this.updateForm.get('joined_at').setValue(res["created_at"])
    })
  }
}

