import { IManager } from "@models/manager";
import { IPlayer, Position } from "@models/player";
import { For, createSignal } from "solid-js";
import { Type } from "typescript";
import PlayerCircle, { IPlayerCircle } from "~/components/manager/PlayerCircle";

const TeamBox = (props: {
  manager: IManager;
  players: IPlayer[];
  benchSize: number;
  totalBudget: number;
}) => {
  const pCircles = () => extractPlayerCircleData(props.players);
  const spent = props.players.reduce((prev, player) => prev + player.price, 0);
  const openSpots = props.benchSize - props.players.length;
  const availCash = props.totalBudget - spent;
  return (
    <div class="border border-3 p-2 w-fit flex flex-col">
      <div class="flex m-2 justify-between">
        <span class="font-bold">{props.manager.name}</span>
        <span>{openSpots} open </span>
        <div class=" flex space-x-4">
          <span class="text-green-600 font-bold">${availCash}</span>
          <span class="text-yellow-500 font-bold">
            ${availCash - openSpots}
          </span>
        </div>
      </div>
      <div class="flex space-x-2">
        <For each={pCircles()}>
          {(pCircle, i) => <PlayerCircle {...pCircle} />}
        </For>
      </div>
    </div>
  );
};

const extractPlayerCircleData = (players: IPlayer[]) => {
  const posCount: Record<Position, number> = {
    QB: 0,
    RB: 0,
    WR: 0,
    TE: 0,
    K: 0,
    DST: 0,
  };

  players.forEach((player) => console.log("player pos", player.position));
  players.forEach((player) => posCount[player.position]++);
  const playerCircles: IPlayerCircle[] = Object.keys(posCount).map((key) => {
    return {
      pos: key as Position,
      count: posCount[key as Position],
    };
  });

  return playerCircles;
};

export default TeamBox;
