import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppConstants} from "../common/app-constants";
import {RoomService} from "../services/room.service";
import {Room} from "../models/room.model";
import {Store} from "@ngrx/store";
import * as RoomAction from "../store/room/room.action";
import {Card} from "../models/card.model";
import {Subject, takeUntil} from "rxjs";

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
export class CreateRoomComponent implements OnInit, OnDestroy {

  createRoomForm: FormGroup<CreateRoomFormGroup>;
  ngDestroyed$ = new Subject<void>();

  constructor(
    private roomService: RoomService,
    private store: Store<{ room: Room }>
  ) {
  }

  ngOnInit(): void {
    const nickname: string = localStorage.getItem(AppConstants.lastNickname) ?? "";
    const roomName: string = localStorage.getItem(AppConstants.lastRoomName) ?? "";
    const deck: string = localStorage.getItem(AppConstants.lastDeck) ?? AppConstants.defaultDeck;
    const watcher: boolean = JSON.parse(localStorage.getItem(AppConstants.lastWatcher) as string) ?? false;
    this.createRoomForm = new FormGroup<CreateRoomFormGroup>({
      nickname: new FormControl<string>(nickname, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      roomName: new FormControl<string>(roomName, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ]
      }),
      deck: new FormControl<string>(deck, {
        nonNullable: true,
        validators: [
          Validators.maxLength(158),
          Validators.required
        ]
      }),
      watcher: new FormControl<boolean>(watcher, {nonNullable: true})
    });
    this.createRoomForm.get("nickname")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastNickname, value));
    this.createRoomForm.get("roomName")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastRoomName, value));
    this.createRoomForm.get("deck")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastDeck, value));
    this.createRoomForm.get("watcher")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastWatcher, value.toString()));
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  createRoom(): void {
    if (this.createRoomForm.valid) {
      const cards: Card[] = this.createRoomForm.value.deck!.split("; ").map((value: string) => {
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
