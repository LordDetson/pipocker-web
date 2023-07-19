import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstants} from "../common/app-constants";
import {RoomService} from "../services/room.service";
import {Room} from "../models/room.model";
import {Store} from "@ngrx/store";
import * as RoomAction from "../store/room/room.action";
import {Card} from "../models/card.model";

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
    private roomService: RoomService,
    private store: Store<{ room: Room }>
  ) {
  }

  ngOnInit(): void {
    let defaultNickname = "";
    let defaultRoomName = "";
    let defaultDeck = AppConstants.defaultDeck;
    let defaultWatcher = false;
    let lastNickname = localStorage.getItem(AppConstants.lastNickname);
    let lastRoomName = localStorage.getItem(AppConstants.lastRoomName);
    let lastDeck = localStorage.getItem(AppConstants.lastDeck);
    let lastWatcher = localStorage.getItem(AppConstants.lastWatcher);
    if (lastNickname) {
      defaultNickname = lastNickname;
    }
    if (lastRoomName) {
      defaultRoomName = lastRoomName;
    }
    if (lastDeck) {
      defaultDeck = lastDeck;
    }
    if (lastWatcher) {
      defaultWatcher = (lastWatcher =="true");
    }
    this.createRoomForm = new FormGroup<CreateRoomFormGroup>({
      nickname: new FormControl<string>(defaultNickname, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      roomName: new FormControl<string>(defaultRoomName, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      deck: new FormControl<string>(defaultDeck, {
        nonNullable: true,
        validators: [
          Validators.maxLength(158),
          Validators.required
        ]
      }),
      watcher: new FormControl<boolean>(defaultWatcher, {nonNullable: true})
    });
    this.createRoomForm.get("nickname")?.valueChanges
      .subscribe(value => localStorage.setItem(AppConstants.lastNickname, value));
    this.createRoomForm.get("roomName")?.valueChanges
      .subscribe(value => localStorage.setItem(AppConstants.lastRoomName, value));
    this.createRoomForm.get("deck")?.valueChanges
      .subscribe(value => localStorage.setItem(AppConstants.lastDeck, value));
    this.createRoomForm.get("watcher")?.valueChanges
      .subscribe(value => localStorage.setItem(AppConstants.lastWatcher, value.toString()));
  }

  createRoom(): void {
    if (this.createRoomForm.valid) {
      let cards: Card[] = this.createRoomForm.value.deck!.split("; ").map((value: string) => {
        return {value};
      })
      this.store.dispatch(RoomAction.create({
        createRoomInfo: {
          nickname: this.createRoomForm.value.nickname!,
          roomName: this.createRoomForm.value.roomName!,
          deck: {cards},
          watcher: this.createRoomForm.value.watcher!
        }
      }));
      this.createRoomForm.reset();
    }
  }
}
