import {createAction, props} from "@ngrx/store";
import {Participant} from "../../models/participant.model";

export enum ParticipantActionType {
  init = "[Participant] init",
  initSuccess = "[Participant] init success",
  initFailure = "[Participant] init failure",
  destroy = "[Participant] destroy",
  destroySuccess = "[Participant] destroy success",
}

export const init = createAction(ParticipantActionType.init);
export const initSuccess = createAction(ParticipantActionType.initSuccess,
  props<{ participant: Participant }>());
export const initFailure = createAction(ParticipantActionType.initFailure,
  props<{ error: any }>());
export const destroy = createAction(ParticipantActionType.destroy);
export const destroySuccess = createAction(ParticipantActionType.destroySuccess);
