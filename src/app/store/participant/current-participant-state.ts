import {Participant} from "../../models/participant.model";
import {Card} from "../../models/card.model";

export interface CurrentParticipantState {
  currentParticipant: Participant | undefined;
  selectedCard: Card | undefined;
  error: any;
  status: CurrentParticipantStatus;
}

export enum CurrentParticipantStatus {
  pending = "pending",
  loading = "loading",
  success = "success",
  error = "error"
}
