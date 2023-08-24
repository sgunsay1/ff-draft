import { IManager } from "@models/manager";
import axios from "axios";
import { For } from "solid-js";
import { A, createRouteData, useRouteData } from "solid-start";
import TeamBox from "~/components/manager/TeamBox";

const SERVER = "http://127.0.0.1:3001";
const BENCH_SIZE = 14;
const TOTAL_BUDGET = 200;

export const routeData = () => {
  return createRouteData(async () => {
    const response = await axios.get(`${SERVER}/manager`);
    console.log("res", response);
    return response.data as IManager[];
  });
};

const Home = () => {
  const managers = useRouteData<typeof routeData>();
  console.log("managers", managers());

  return (
    <>
      <div id="managerPane">
        <For each={managers()}>
          {(manager, i) => (
            <TeamBox
              benchSize={BENCH_SIZE}
              totalBudget={TOTAL_BUDGET}
              manager={manager}
              players={manager.players ?? []}
            />
          )}
        </For>
      </div>
      <div>
        <div id="priceStrategy"></div>
        <div id="playerTable"></div>
      </div>
    </>
  );
};

export default Home;
