import { IManager } from "@models/manager";
import { INflTeam } from "@models/nflTeam";
import { IPlayer } from "@models/player";
import { createQuery, useQueryClient } from "@tanstack/solid-query";
import axios from "axios";
import { For, createEffect, createRoot, createSignal } from "solid-js";
import {
  A,
  createRouteData,
  refetchRouteData,
  useRouteData,
} from "solid-start";
import { getManagers } from "~/api/manager";
import { getPlayers } from "~/api/player";
import { getTeams } from "~/api/team";
import ManagerModal from "~/components/manager/ManagerModal";
import TeamBox from "~/components/manager/TeamBox";
import PlayerTable from "~/components/player/PlayerTable";
import { TeamData } from "~/stories/player/teams.data";

const BENCH_SIZE = 15;
const TOTAL_BUDGET = 200;

export const routeData = () => {
  const managers = createRouteData(getManagers, { key: ["managers"] });
  const players = createRouteData(getPlayers, { key: ["players"] });
  const teams = createRouteData(getTeams, { key: ["teams"] });
  return { managers, players, teams };
};

const Home = () => {
  const data = useRouteData<typeof routeData>();
  const mQuery = createQuery(() => ["managers"], getManagers);
  const managers = () => mQuery.data ?? [];

  return (
    <div class="flex h-screen justify-between px-24 space-x-12 py-4">
      <div
        id="managerPane"
        class="flex flex-col space-y-2 h-full min-w-fit overflow-y-auto p-4"
      >
        <For each={managers()}>
          {(manager, i) => (
            <ManagerModal teams={data.teams() ?? []} manager={manager}>
              <TeamBox
                benchSize={BENCH_SIZE}
                totalBudget={TOTAL_BUDGET}
                manager={manager}
                players={manager.players ?? []}
              />
            </ManagerModal>
          )}
        </For>
      </div>
      <div class="w-full py-4">
        <div id="priceStrategy"></div>
        <div id="playerTable" class="h-full w-full overflow-y-auto">
          <PlayerTable teams={TeamData} managers={managers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
