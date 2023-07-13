import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../models/room.model";
import {AppConstants} from "../common/app-constants";
import {Card} from "../models/card.model";

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
}
