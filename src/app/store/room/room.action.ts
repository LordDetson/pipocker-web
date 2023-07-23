import {createAction, props} from "@ngrx/store";
import {Room} from "../../models/room.model";
import {Participant} from "../../models/participant.model";
import {CreateRoomInfo} from "../../models/create-room.model";
import {Card} from "../../models/card.model";
import {Vote} from "../../models/vote";

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
  removeParticipantFailure = "[Room] remove participant failure",
  selectCard = "[Room] select card",
  cardSelectionSuccess = "[Room] card selection success",
  cardSelectionFailure = "[Room] card selection failure",
  showVotingResult = "[Room] show voting result",
  startNewVoting = "[Room] start new voting",
  startNewVotingSuccess = "[Room] start new voting success",
  startNewVotingFailure = "[Room] start new voting failure",
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
export const selectCard = createAction(RoomActionType.selectCard,
  props<{ participant: Participant, card: Card }>());
export const cardSelectionSuccess = createAction(RoomActionType.cardSelectionSuccess,
  props<{ vote: Vote }>());
export const cardSelectionFailure = createAction(RoomActionType.cardSelectionFailure,
  props<{ error: any }>());
export const showVotingResult = createAction(RoomActionType.showVotingResult);
export const startNewVoting = createAction(RoomActionType.startNewVoting);
export const startNewVotingSuccess = createAction(RoomActionType.startNewVotingSuccess);
export const startNewVotingFailure = createAction(RoomActionType.startNewVotingFailure,
  props<{ error: any }>());
