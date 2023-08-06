import {CurrentParticipantState, CurrentParticipantStatus} from "./current-participant-state";
import {Action, createReducer, on} from "@ngrx/store";
import * as ParticipantAction from "./participant.action";

const initialState: CurrentParticipantState = {
  currentParticipant: undefined,
  selectedCard: undefined,
  error: undefined,
  status: CurrentParticipantStatus.pending
};

const _currentParticipantReducer = createReducer<CurrentParticipantState>(initialState,
  on(ParticipantAction.init, (state) => ({
    ...state,
    status: CurrentParticipantStatus.loading,
  })),
  on(ParticipantAction.initSuccess, (state, {participant}) => ({
    ...state,
    currentParticipant: participant,
    status: CurrentParticipantStatus.success,
  })),
  on(ParticipantAction.initFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: CurrentParticipantStatus.error,
  })),
  on(ParticipantAction.destroy, (state) => ({
    ...state,
    status: CurrentParticipantStatus.loading,
  })),
  on(ParticipantAction.destroySuccess, (state) => ({
    ...state,
    currentParticipant: undefined,
    status: CurrentParticipantStatus.success,
  })),
  on(ParticipantAction.initSelectedCurdSuccess, (state, {card}) => ({
    ...state,
    selectedCard: card,
    status: CurrentParticipantStatus.success,
  })),
  on(ParticipantAction.initSelectedCurdFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: CurrentParticipantStatus.error,
  })),
  on(ParticipantAction.destroySelectedCurdSuccess, state => ({
    ...state,
    selectedCard: undefined,
    status: CurrentParticipantStatus.success,
  })),
  on(ParticipantAction.destroySelectedCurdFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: CurrentParticipantStatus.error,
  })),
);

export function currentParticipantReducer(state: CurrentParticipantState | undefined, action: Action) {
  return _currentParticipantReducer(state, action);
}
