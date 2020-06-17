import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TransferDataService } from '../../services/shared-data/transfer-data.service';
import { empty, equal } from 'src/utils/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateForm: FormGroup;
  user: object = {};
  isLoading: boolean;
  avatar: string;
  private avatarUrl: string = 'https://ui-avatars.com/api/?size=512&name=';

  constructor(private transferService: TransferDataService, private userService: UserDataService) {
    this.updateForm = new FormGroup({
      username: new FormControl({ disabled: true, value: "" }, [
        Validators.required,
        Validators.minLength(5)]),
      email: new FormControl({ disabled: false, value: "" }, [
        Validators.required,
        Validators.email
      ],
      ),
      phone: new FormControl({ disabled: false, value: "" }, [
        Validators.minLength(10),
        Validators.maxLength(14),
      ]),
      firstName: new FormControl({ disabled: false, value: "" }, [
        Validators.minLength(4),
        Validators.maxLength(14),
      ],
      ),
      secondName: new FormControl({ disabled: false, value: "" }, [
        Validators.minLength(4),
        Validators.maxLength(14),
      ]),
      gender: new FormControl({ disabled: false, value: "" },
      ),
      joined_at: new FormControl({ disabled: true, value: "" }),
    });
    this.getUser();
  }

  ngOnInit() {
    this.isLoading = false;
  }
  updateUser() {
    this.isLoading = true;
    this.userService.updateUser(this.updateForm.value).subscribe(res => {
      this.isLoading = false;
      this.transferService.setUser(res);
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

      this.updateForm.setValue({
        username: res["username"],
        email: res["email"],
        gender: res["gender"],
        phone: res["phone"],
        firstName: res["firstName"],
        secondName: res["secondName"],
        joined_at: res["created_at"]
      });
      this.avatar = this.avatarUrl + res["username"];
    })
  }
}

