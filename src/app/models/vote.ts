import {Participant} from "./participant.model";
import {Card} from "./card.model";

export interface Vote {

  participant: Participant,
  card: Card
}
