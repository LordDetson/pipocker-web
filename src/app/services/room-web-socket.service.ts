import {Injectable} from '@angular/core';
import {AppConstants} from "../common/app-constants";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {RoomEvent} from "../models/room-event";
import {Store} from "@ngrx/store";
import * as RoomAction from "../store/room/room.action";

@Injectable({
  providedIn: 'root'
})
export class RoomWebSocketService {

  stompClient: any;

  constructor(private store: Store) {
  }

  connect(roomId: string) {
    this.stompClient = Stomp.over(new SockJS(AppConstants.wsUrl));
    const _this = this;
    _this.stompClient.connect({}, (obj: any) => {
      console.log(obj);
      console.log(JSON.stringify(obj));
      _this.stompClient.subscribe(AppConstants.roomTopic + roomId, (message: any) => {
        _this.handleEvent(JSON.parse(message.body));
      });
    }, (error: any) => {
      setTimeout(() => {
        this.connect(roomId);
      }, 5000);
    });
  };

  handleEvent(event: RoomEvent) {
    switch (event.type) {
      case "JOINED":
        this.store.dispatch(RoomAction.addParticipantSuccess({participant: event.participant}));
        break;
      case "LEFT":
        this.store.dispatch(RoomAction.removeParticipantSuccess({participant: event.participant}));
        break;
      case "VOTED":
        this.store.dispatch(RoomAction.cardSelectionSuccess({
          participant: event.participant,
          card: event.card
        }));
        break;
      case "SHOW_VOTING_RESULT":
        this.store.dispatch(RoomAction.showVotingResultSuccess());
        break;
      case "VOTE_CLEARED":
        this.store.dispatch(RoomAction.startNewVotingSuccess());
        break;
      default:
        console.log("default");
    }
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendShowVotingResultEvent(roomId: string) {
    this.stompClient.send("/app/room/" + roomId + "/showVotingResult", {}, {});
  }
}
