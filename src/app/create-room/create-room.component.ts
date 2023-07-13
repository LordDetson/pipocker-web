import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppConstants} from "../common/app-constants";
import {RoomService} from "../services/room.service";
import {Room} from "../models/room.model";

interface CreateRoomFormGroup {
  nickname: FormControl<string>;
  roomName: FormControl<string>;
  deck: FormControl<string>;
  watcher: FormControl<boolean>;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  createRoomForm: FormGroup<CreateRoomFormGroup>;

  constructor(
    private router: Router,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.createRoomForm = new FormGroup<CreateRoomFormGroup>({
      nickname: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      roomName: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      deck: new FormControl<string>(AppConstants.defaultDeck, {
        nonNullable: true,
        validators: [
          Validators.maxLength(158),
          Validators.required
        ]
      }),
      watcher: new FormControl<boolean>(false, {nonNullable: true})
    })
  }

  createRoom(): void {
    if (this.createRoomForm.valid) {
      this.roomService.create(this.createRoomForm.value).subscribe({
        next: ((room: Room) => {
          this.router.navigate(['room', room.id]);
          this.createRoomForm.reset();
        }),
        error: (error => {
          console.log(error)
        })
      });
    }
  }
}
