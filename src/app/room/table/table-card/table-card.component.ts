import {Component, Input} from '@angular/core';
import {Participant} from "../../../models/participant.model";
import {map, Observable} from "rxjs";
import {Card} from "../../../models/card.model";
import {Store} from "@ngrx/store";
import {VotingResult} from "../../../models/voting-result.model";
import * as RoomSelector from "../../../store/room/room.selector";

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent {

  @Input()
  participant: Participant;

  votingResult$: Observable<VotingResult> = this.store.select(RoomSelector.votingResultSelector);
  selectedCard$: Observable<Card | undefined> = this.votingResult$.pipe(map(votingResult => votingResult.map.get(this.participant.nickname)));
  voted$: Observable<boolean> = this.selectedCard$.pipe(map(selectedCard => selectedCard != undefined));
  showVotingResult$: Observable<boolean> = this.store.select(RoomSelector.showVotingResultSelector);

  constructor(
    private store: Store
  ) {
  }
}
