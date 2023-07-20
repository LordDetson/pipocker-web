import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoomService} from "../../services/room.service";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import * as ParticipantAction from "./participant.action";
import {mergeMap, Observable, of, withLatestFrom} from "rxjs";
import * as RoomAction from "../room/room.action";
import {idSelector} from "../room/room.selector";
import {currentParticipantSelector} from "./participant.selector";
import {Participant} from "../../models/participant.model";

@Injectable()
export class ParticipantEffect {

  roomId$: Observable<string> = this.store.pipe(select(idSelector));
  participant$: Observable<Participant> = this.store.pipe(select(currentParticipantSelector));

  destroy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ParticipantAction.destroy),
      withLatestFrom(this.store.select(idSelector), this.store.select(currentParticipantSelector)),
      mergeMap(([action, roomId, participant]) => {
        this.store.dispatch(RoomAction.removeParticipant({roomId, participant}));
        return of(ParticipantAction.destroySuccess());
      })
    )
  );

  constructor(
    private actions$: Actions,
    private roomService: RoomService,
    private router: Router,
    private store: Store
  ) {
  }
}
