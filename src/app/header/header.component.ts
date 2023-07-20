import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {idSelector, nameSelector} from "../store/room/room.selector";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  roomId$: Observable<string> = this.store.pipe(select(idSelector));
  roomName$: Observable<string> = this.store.pipe(select(nameSelector));

  constructor(
    private store: Store,
    private clipboard: Clipboard
  ) {
  }

  copyInvitationLink(roomId: string): void {
    this.clipboard.copy("http://localhost:4200/room/" + roomId)
  }
}
