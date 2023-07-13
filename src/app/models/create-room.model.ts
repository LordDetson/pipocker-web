import {Deck} from "./deck.model";

export class CreateRoom {
  constructor(
    public nickname: string,
    public roomName: string,
    public deck: Deck,
    public watcher: boolean
  ) {
  }
}
