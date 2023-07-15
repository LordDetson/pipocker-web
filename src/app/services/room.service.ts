import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../models/room.model";
import {AppConstants} from "../common/app-constants";
import {Card} from "../models/card.model";
import {Participant} from "../models/participant.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {
  }

  create(createRoom: any): Observable<Room> {
    let cards: Card[] = createRoom.deck.split("; ").map((value: string, index: number) => {
      return {value};
    })
    createRoom.deck = {cards};
    return this.http.post<Room>(AppConstants.apiUrl + "/room", createRoom, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  get(id: string): Observable<Room> {
    return this.http.get<Room>(AppConstants.apiUrl + "/room/" + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  checkIfNicknameExist(id: string, nickname: string): Observable<boolean> {
    return this.http.get<boolean>(AppConstants.apiUrl + "/room/" + id + "/check-if-nickname-exist", {
      headers: {
        'Content-Type': 'application/json'
      },
      params: new HttpParams().set('nickname', nickname)
    });
  }

  addParticipant(id: string, nickname: string, watcher: boolean): Observable<Room> {
    let participant: Participant = {nickname, watcher}
    return this.http.put<Room>(AppConstants.apiUrl + "/room/" + id, participant, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
