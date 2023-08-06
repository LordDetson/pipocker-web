import {Participant} from "./participant.model";
import {Card} from "./card.model";

export interface RoomEvent {
  type: string,
  participant: Participant,
  card: Card
}
