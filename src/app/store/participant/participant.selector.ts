import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CurrentParticipantState} from "./current-participant-state";
import {currentParticipantStateNode} from "../intex";
import {Participant} from "../../models/participant.model";
import {Card} from "../../models/card.model";

export const currentParticipantFeatureSelector = createFeatureSelector<CurrentParticipantState>(currentParticipantStateNode);

export const currentParticipantSelector = createSelector(
  currentParticipantFeatureSelector,
  (state: CurrentParticipantState): Participant => state.currentParticipant!
);
export const statusSelector = createSelector(
  currentParticipantFeatureSelector,
  (state: CurrentParticipantState): string => state.status
);
export const selectedCardSelector = createSelector(
  currentParticipantFeatureSelector,
  (state: CurrentParticipantState): Card | undefined => state.selectedCard
)
