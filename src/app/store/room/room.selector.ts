import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Participant} from "../../models/participant.model";
import {Card} from "../../models/card.model";
import {roomStateNode} from "../intex";
import {RoomState} from "./room-state";

export const roomFeatureSelector = createFeatureSelector<RoomState>(roomStateNode);

export const statusSelector = createSelector(roomFeatureSelector, (state: RoomState): string => state.status);
export const idSelector = createSelector(roomFeatureSelector, (state: RoomState): string => state.room.id);
export const nameSelector = createSelector(roomFeatureSelector, (state: RoomState): string => state.room.name);
export const participantsSelector = createSelector(roomFeatureSelector, (state: RoomState): Participant[] => state.room.participants);
export const cardsSelector = createSelector(roomFeatureSelector, (state: RoomState): Card[] => state.room.deck.cards);
