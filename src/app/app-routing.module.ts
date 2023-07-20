import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateRoomComponent} from "./create-room/create-room.component";
import {RoomComponent} from "./room/room.component";
import {AddParticipantComponent} from "./add-participant/add-participant.component";

const routes: Routes = [
  {path: "", component: CreateRoomComponent},
  {path: "room/:id", component: RoomComponent},
  {path: "join-to-room/:id", component: AddParticipantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
