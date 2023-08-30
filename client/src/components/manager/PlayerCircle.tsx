import { createSignal } from "solid-js";
import Player, { Position } from "@models/player";

export interface IPlayerCircle {
  pos: Position;
  count: number;
}
const PlayerCircle = (props: IPlayerCircle) => {
  return (
    <div class="bg-base-100 rounded-full border w-14 h-14 p-1 flex flex-col text-center border-black">
      <div class=" font-bold">{props.pos}</div>
      <div class="text-sm pb-4">{props.count}</div>
    </div>
  );
};

export default PlayerCircle;
