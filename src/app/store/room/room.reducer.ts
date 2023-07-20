import {Action, createReducer, on} from "@ngrx/store";
import * as RoomAction from "./room.action";
import {Participant} from "../../models/participant.model";
import {Card} from "../../models/card.model";
import {RoomState, RoomStatus} from "./room-state";

const initialRoomState: RoomState = {
  room: {
    id: "",
    name: "",
    deck: {
      cards: []
    },
    participants: [],
    votingResult: {
      map: new Map<Participant, Card>()
    }
  },
  error: undefined,
  status: RoomStatus.pending
};

const _roomReducer = createReducer<RoomState>(initialRoomState,
  on(RoomAction.create, (state) => ({
    ...state,
    status: RoomStatus.loading
  })),
  on(RoomAction.get, (state) => ({
    ...state,
    status: RoomStatus.loading
  })),
  on(RoomAction.initSuccess, (state, {room}) => ({
    ...state,
    room,
    status: RoomStatus.success
  })),
  on(RoomAction.initFailure, (state, {error}) => ({
    ...state,
    error,
    status: RoomStatus.error
  })),
  on(RoomAction.addParticipantSuccess, (state, {participant}) => ({
    ...state,
    room: {
      ...state.room,
      participants: [...state.room.participants, participant]
    }
  })),
  on(RoomAction.addParticipantFailure, (state, {error}) => ({
    ...state,
    error,
    status: RoomStatus.error
  })),
  on(RoomAction.removeParticipantSuccess, (state, {participant}) => ({
    ...state,
    room: {
      ...state.room,
      participants: state.room.participants.filter((item) => item !== participant)
    }
  })),
  on(RoomAction.removeParticipantFailure, (state, {error}) => ({
    ...state,
    error,
    status: RoomStatus.error
  })),
)

export function roomReducer(state: RoomState | undefined, action: Action) {
  return _roomReducer(state, action);
}
