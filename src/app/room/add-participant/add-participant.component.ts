import {Component, OnInit} from '@angular/core';
import {Room} from "../../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../services/room.service";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as RoomAction from "../../store/room/room.action";
import {Participant} from "../../models/participant.model";
import {AppConstants} from "../../common/app-constants";

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {

  joinToRoomForm: FormGroup;
  roomId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private store: Store<{ room: Room }>
  ) {
    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    let defaultNickname = "";
    let defaultWatcher = false;
    let lastNickname = localStorage.getItem(AppConstants.lastNickname);
    let lastWatcher = localStorage.getItem(AppConstants.lastWatcher);
    if (lastNickname) {
      defaultNickname = lastNickname;
    }
    if (lastWatcher) {
      defaultWatcher = (lastWatcher == "true");
    }
    this.joinToRoomForm = new FormGroup({
      nickname: new FormControl<string>(defaultNickname, {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ],
        asyncValidators: nicknameValidatorFactory(this.roomService, this.roomId)
      }),
      watcher: new FormControl<boolean>(defaultWatcher, {nonNullable: true})
    });
  }

  addParticipant(): void {
    if (this.joinToRoomForm.valid) {
      let participant: Participant = {
        nickname: this.joinToRoomForm.value.nickname,
        watcher: this.joinToRoomForm.value.watcher
      }
      this.joinToRoomForm.reset();
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
