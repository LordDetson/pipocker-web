import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as RoomAction from "../../../store/room/room.action";
import {Participant} from "../../../models/participant.model";
import {Card} from "../../../models/card.model";
import {map, Observable, take, tap} from "rxjs";
import * as ParticipantAction from "../../../store/participant/participant.selector";

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss'],
  host: {
    class: "card m-2"
  }
})
export class DeckCardComponent implements OnInit {

  @Input()
  card: Card;

  participant$: Observable<Participant> = this.store.select(ParticipantAction.currentParticipantSelector);
  selectedCard$: Observable<Card | undefined> = this.store.select(ParticipantAction.selectedCardSelector);
  selected$: Observable<boolean> = this.selectedCard$.pipe(map(selectedCard => selectedCard?.value === this.card.value));
  selected: boolean;

  constructor(
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.selected$.subscribe(value => this.selected = value);
  }

  select() {
    this.participant$.pipe(
      take(1),
      tap(participant => {
        this.store.dispatch(RoomAction.selectCard({
            participant,
            card: this.card
          }
        ));
      })
    ).subscribe();
  }

  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this.selected;
  }

  @HostBinding('class.bg-body-secondary')
  get isNotSelected(): boolean {
    return !this.selected;
  }
}
