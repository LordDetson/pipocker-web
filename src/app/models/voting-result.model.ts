import {Participant} from "./participant.model";
import {Card} from "./card.model";

export interface VotingResult {
  map: Map<Participant, Card>;
}
