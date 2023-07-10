import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppConstants} from "../common/app-constants";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  checkoutForm: FormGroup;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup<any>({
      nickname: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.required
      ]),
      roomName: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(32),
        Validators.required
      ]),
      deck: new FormControl(AppConstants.defaultDeck, [
        Validators.maxLength(158),
        Validators.required
      ]),
      watcher: new FormControl(false)
    })
  }

  createRoom(): void {
    if (this.checkoutForm.valid) {
      console.log("Send data to backend");
      this.router.navigate(['/room']);
      this.checkoutForm.reset();
    }
  }
}
