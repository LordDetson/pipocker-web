import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoomService} from "../../services/room.service";
import * as RoomAction from "./room.action";
import * as ParticipantAction from "../participant/participant.action";
import {catchError, map, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as RoomSelector from "./room.selector";
import * as ParticipantSelector from "../participant/participant.selector";
import {Participant} from "../../models/participant.model";
import {Card} from "../../models/card.model";

@Injectable()
export class RoomEffect {

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.create),
      switchMap(action =>
        this.roomService.create(action.createRoomInfo).pipe(
          switchMap(room => {
            room.votingResult.map = new Map<string, Card>();
            return of(
              RoomAction.initSuccess({room}),
              ParticipantAction.initSuccess({participant: room.participants[0]})
            )
          }),
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
  );

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
  );

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
  );

  selectCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.selectCard),
      withLatestFrom(
        this.store.select(RoomSelector.idSelector),
        this.store.select(ParticipantSelector.currentParticipantSelector)
      ),
      switchMap(([action, roomId, participant]) =>
        this.roomService.vote(roomId, action.participant, action.card).pipe(
          switchMap(vote => {
            return of(
              RoomAction.cardSelectionSuccess({vote}),
              ParticipantAction.initSelectedCurdSuccess({vote})
            );
          }),
          catchError(error =>
            of(
              RoomAction.cardSelectionFailure({error}),
              ParticipantAction.initSelectedCurdFailure({error})
            )
          )
        )
      )
    )
  );

  startNewVoting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomAction.startNewVoting),
      withLatestFrom(this.store.select(RoomSelector.idSelector)),
      switchMap(([action, roomId]) =>
        this.roomService.clearVotingResult(roomId).pipe(
          switchMap(() => {
            return of(
              RoomAction.startNewVotingSuccess(),
              ParticipantAction.destroySelectedCurdSuccess()
            );
          }),
          catchError(error =>
            of(
              RoomAction.startNewVotingFailure({error}),
              ParticipantAction.destroySelectedCurdFailure({error})
            )
          )
        )
      )
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
