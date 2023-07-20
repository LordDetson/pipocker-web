import {Participant} from "../../models/participant.model";

export interface CurrentParticipantState {
  currentParticipant: Participant | undefined;
  error: any;
  status: CurrentParticipantStatus;
}

export enum CurrentParticipantStatus {
  pending = "pending",
  loading = "loading",
  success = "success",
  error = "error"
}
