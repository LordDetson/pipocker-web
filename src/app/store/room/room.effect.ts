import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoomService} from "../../services/room.service";
import * as RoomAction from "./room.action";
import * as ParticipantAction from "../participant/participant.action";
import {catchError, map, mergeMap, of, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class RoomEffect {

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.create),
      switchMap(action =>
        this.roomService.create(action.createRoomInfo).pipe(
          switchMap(room =>
            of(
              RoomAction.initSuccess({room}),
              ParticipantAction.initSuccess({participant: room.participants[0]})
            )
          ),
          catchError(error =>
            of(
              RoomAction.initFailure({error}),
              ParticipantAction.initFailure({error})
            )
          )
        )
      )
    )
  );

  dispatchParticipantInit = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.create, RoomAction.addParticipant),
      switchMap(() => of(ParticipantAction.init()))
    ),
  )

  navigateToRoom$ = createEffect(() =>
      this.actions$.pipe(
        ofType(RoomAction.initSuccess),
        tap(action => this.router.navigate(["room", action.room.id]))
      ),
    {dispatch: false}
  );

  getRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.get),
      mergeMap(action =>
        this.roomService.get(action.roomId).pipe(
          map(room => RoomAction.initSuccess({room})),
          catchError(error => of(RoomAction.initFailure({error})))
        )
      )
    )
  );

  addParticipant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.addParticipant),
      switchMap(action =>
        this.roomService.addParticipant(action.roomId, action.participant).pipe(
          switchMap(participant =>
            of(
              ParticipantAction.initSuccess({participant}),
              RoomAction.addParticipantSuccess({participant})
            )
          ),
          catchError(error =>
            of(
              ParticipantAction.initFailure({error}),
              RoomAction.addParticipantFailure({error})
            )
          )
        )
      )
    )
  )

  removeParticipant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.removeParticipant),
      mergeMap(action =>
        this.roomService.removeParticipant(action.roomId, action.participant).pipe(
          map(participant => RoomAction.removeParticipantSuccess({participant})),
          catchError(error => of(RoomAction.removeParticipantFailure({error})))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private roomService: RoomService,
    private router: Router
  ) {
  }
}
