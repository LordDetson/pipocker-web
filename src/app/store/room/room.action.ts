import {createAction, props} from "@ngrx/store";
import {Room} from "../../models/room.model";
import {Participant} from "../../models/participant.model";
import {CreateRoomInfo} from "../../models/create-room.model";

export enum RoomActionType {
  create = "[Room] create",
  get = "[Room] get",
  initSuccess = "[Room] init success",
  initFailure = "[Room] init failure",
  addParticipant = "[Room] add participant",
  addParticipantSuccess = "[Room] add participant success",
  addParticipantFailure = "[Room] add participant failure",
  removeParticipant = "[Room] remove participant",
  removeParticipantSuccess = "[Room] remove participant success",
  removeParticipantFailure = "[Room] remove participant failure"
}

export const create = createAction(RoomActionType.create,
  props<{ createRoomInfo: CreateRoomInfo }>());
export const get = createAction(RoomActionType.get,
  props<{ roomId: string }>());
export const initSuccess = createAction(RoomActionType.initSuccess,
  props<{ room: Room }>());
export const initFailure = createAction(RoomActionType.initFailure,
  props<{ error: any }>());
export const addParticipant = createAction(RoomActionType.addParticipant,
  props<{ roomId: string, participant: Participant }>());
export const addParticipantSuccess = createAction(RoomActionType.addParticipantSuccess,
  props<{ participant: Participant }>());
export const addParticipantFailure = createAction(RoomActionType.addParticipantFailure,
  props<{ error: any }>());
export const removeParticipant = createAction(RoomActionType.removeParticipant,
  props<{ roomId: string, participant: Participant }>());
export const removeParticipantSuccess = createAction(RoomActionType.removeParticipantSuccess,
  props<{ participant: Participant }>());
export const removeParticipantFailure = createAction(RoomActionType.removeParticipantFailure,
  props<{ error: any }>());
