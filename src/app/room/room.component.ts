import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../services/room.service";
import {Room} from "../models/room.model";
import {AppConstants} from "../common/app-constants";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  room: Room;
  mainBtnText: string = AppConstants.voting;
  mainBtnClass: string = AppConstants.btnSecondaryClass;
  disable: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit(): void {
    this.roomService.get(this.route.snapshot.params['id']).subscribe({
      next: ((room: Room) => {
        this.room = room;
      }),
      error: (error => {
        console.log(error)
      })
    })
  }
}
