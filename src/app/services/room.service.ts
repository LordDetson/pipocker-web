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

  addParticipant(id: string, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(AppConstants.apiUrl + "/room/" + id + "/add-participant", participant, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  removeParticipant(id: string, participant: Participant): Observable<Participant> {
    return this.http.delete<Participant>(AppConstants.apiUrl + "/room/" + id + "/remove-participant", {
      headers: {
        'Content-Type': 'application/json'
      },
      params: new HttpParams().set('nickname', participant.nickname)
    });
  }
}
