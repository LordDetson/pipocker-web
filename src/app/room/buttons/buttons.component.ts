import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {VotingResult} from "../../models/voting-result.model";
import * as RoomSelector from "../../store/room/room.selector";
import * as RoomAction from "../../store/room/room.action";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  votingResult$: Observable<VotingResult> = this.store.select(RoomSelector.votingResultSelector);
  voted$: Observable<boolean> = this.votingResult$.pipe(map(votingResult => {
    if (votingResult.map instanceof Map) {
      return votingResult.map.size != 0;
    }
    return false;
  }));
  voted: boolean;
  showVotingResult$: Observable<boolean> = this.store.select(RoomSelector.showVotingResultSelector);
  showVotingResult: boolean;

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.voted$.subscribe(voted => this.voted = voted);
    this.showVotingResult$.subscribe(showVotingResult => this.showVotingResult = showVotingResult)
  }

  mainBtnClick() {
    if (this.voted) {
      if (!this.showVotingResult) {
        this.store.dispatch(RoomAction.showVotingResult());
      } else {
        this.store.dispatch(RoomAction.startNewVoting());
      }
    }
  }
}
