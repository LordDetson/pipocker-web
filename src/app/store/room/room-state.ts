import {Room} from "../../models/room.model";

export interface RoomState {
  room: Room;
  error: any;
  status: RoomStatus;
}

export enum RoomStatus {
  pending = "pending",
  loading = "loading",
  success = "success",
  error = "error"
}
