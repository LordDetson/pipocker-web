import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CurrentParticipantState, CurrentParticipantStatus} from "./current-participant-state";
import {currentParticipantStateNode} from "../intex";
import {Participant} from "../../models/participant.model";

export const currentParticipantFeatureSelector = createFeatureSelector<CurrentParticipantState>(currentParticipantStateNode);

export const currentParticipantSelector = createSelector(
  currentParticipantFeatureSelector,
  (state: CurrentParticipantState): Participant => state.currentParticipant!
);
export const statusSelector = createSelector(
  currentParticipantFeatureSelector,
  (state: CurrentParticipantState): string => state.status
);
