import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Participant} from "../../models/participant.model";
import {select, Store} from "@ngrx/store";
import * as RoomSelector from "../../store/room/room.selector";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  participants$: Observable<Participant[]> = this.store.pipe(select(RoomSelector.participantsSelector));

  constructor(
    private store: Store
  ) {
  }
}
