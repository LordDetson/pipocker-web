import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {roomReducer} from "./room/room.reducer";
import {CurrentParticipantState} from "./participant/current-participant-state";
import {RoomState} from "./room/room-state";
import {currentParticipantReducer} from "./participant/participant.reducer";

export const roomStateNode = "roomState";
export const currentParticipantStateNode = "currentParticipantState";

export interface AppState {
  [roomStateNode]: RoomState,
  [currentParticipantStateNode]: CurrentParticipantState
}

export const reducers: ActionReducerMap<AppState> = {
  [roomStateNode]: roomReducer,
  [currentParticipantStateNode]: currentParticipantReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
