import {Component, OnDestroy, OnInit} from '@angular/core';
import {Room} from "../../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as RoomAction from "../../store/room/room.action";
import {Participant} from "../../models/participant.model";
import {AppConstants} from "../../common/app-constants";

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit, OnDestroy {

  joinToRoomForm: FormGroup;
  roomId: string;
  ngDestroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private store: Store<{ room: Room }>
  ) {
    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    const nickname: string = localStorage.getItem(AppConstants.lastNickname) ?? "";
    const watcher: boolean = JSON.parse(localStorage.getItem(AppConstants.lastWatcher) as string) ?? false;
    this.joinToRoomForm = new FormGroup({
      nickname: new FormControl<string>(nickname, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ],
        asyncValidators: nicknameValidatorFactory(this.roomService, this.roomId)
      }),
      watcher: new FormControl<boolean>(watcher, {nonNullable: true})
    });
    this.joinToRoomForm.get("nickname")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastNickname, value));
    this.joinToRoomForm.get("watcher")?.valueChanges.pipe(takeUntil(this.ngDestroyed$))
      .subscribe(value => localStorage.setItem(AppConstants.lastWatcher, value.toString()));
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  addParticipant(): void {
    if (this.joinToRoomForm.valid) {
      const participant: Participant = {
        nickname: this.joinToRoomForm.value.nickname,
        watcher: this.joinToRoomForm.value.watcher
      }
      this.store.dispatch(RoomAction.addParticipant({roomId: this.roomId, participant}));
    }
  }
}

const nicknameValidatorFactory = (
  roomService: RoomService,
  roomId: string
): AsyncValidatorFn => {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return roomService.checkIfNicknameExist(roomId, control.value.trim())
      .pipe(
        map((result: boolean) => result ?
          {error: control.value.trim() + " participant.action.ts is already exist"} :
          null
        )
      );
  };
};
