import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CreateRoomComponent} from './create-room/create-room.component';
import {HeaderComponent} from './header/header.component';
import {ThemeSwitcherComponent} from './header/theme-switcher/theme-switcher.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomComponent} from './room/room.component';
import {HttpClientModule} from "@angular/common/http";
import {AddParticipantComponent} from './room/add-participant/add-participant.component';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {metaReducers, reducers} from "./store/intex";
import {EffectsModule} from '@ngrx/effects';
import {RoomEffect} from "./store/room/room.effect";
import {ParticipantEffect} from "./store/participant/participant.effect";
import {ButtonsComponent} from './room/buttons/buttons.component';
import {TableComponent} from './room/table/table.component';
import {DeckComponent} from './room/deck/deck.component';
import {DeckCardComponent} from './room/deck/deck-card/deck-card.component';
import {TableCardComponent} from './room/table/table-card/table-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    HeaderComponent,
    ThemeSwitcherComponent,
    RoomComponent,
    AddParticipantComponent,
    ButtonsComponent,
    TableComponent,
    DeckComponent,
    DeckCardComponent,
    TableCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    EffectsModule.forRoot([RoomEffect, ParticipantEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
