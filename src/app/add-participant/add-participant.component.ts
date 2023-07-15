import {Component, OnInit} from '@angular/core';
import {Room} from "../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";

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
    private roomService: RoomService
  ) {
    this.roomId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.joinToRoomForm = new FormGroup({
      nickname: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.minLength(2),
          Validators.maxLength(32),
          Validators.required
        ],
        asyncValidators: nicknameValidatorFactory(this.roomService, this.roomId)
      }),
      watcher: new FormControl<boolean>(false, {nonNullable: true})
    });
  }

  addParticipant(): void {
    if (this.joinToRoomForm.valid) {
      this.roomService.addParticipant(
        this.roomId,
        this.joinToRoomForm.value.nickname,
        this.joinToRoomForm.value.watcher
      ).subscribe({
        next: ((room: Room) => {
          this.router.navigate(['room', room.id]);
          this.joinToRoomForm.reset();
        }),
        error: (error => {
          console.log(error)
        })
      })
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
