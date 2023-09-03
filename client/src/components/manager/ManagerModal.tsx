import { For, JSXElement, children } from "solid-js";
import { IManager } from "@models/manager";
import { generateByeMap } from "~/api/team";
import { INflTeam } from "@models/nflTeam";
import { getPlayerNewsHref, getTeamHref } from "~/api/player";
import { IPlayer } from "@models/player";
declare const window: any;
const ManagerModal = (props: {
  manager: IManager;
  teams: INflTeam[];
  children: JSXElement;
}) => {
  const c = children(() => props.children);
  const byeMap = generateByeMap(props.teams);
  const sortByes = (p1: IPlayer, p2: IPlayer) =>
    (byeMap.get(p1.teamName) ?? 0) - (byeMap.get(p2.teamName) ?? 0);
  const players = () => {
    const qbs = (
      props.manager.players?.filter((p) => p.position === "QB") ?? []
    ).sort(sortByes);
    const rbs = (
      props.manager.players?.filter((p) => p.position === "RB") ?? []
    ).sort(sortByes);
    const wrs = (
      props.manager.players?.filter((p) => p.position === "WR") ?? []
    ).sort(sortByes);
    const tes = (
      props.manager.players?.filter((p) => p.position === "TE") ?? []
    ).sort(sortByes);
    const ks = (
      props.manager.players?.filter((p) => p.position === "K") ?? []
    ).sort(sortByes);
    const dsts =
      props.manager.players?.filter((p) => p.position === "DST") ?? [];
    return [qbs, rbs, wrs, tes, ks, dsts].flat();
  };
  return (
    <>
      <div onclick={() => window[`m_modal_${props.manager.id}`].showModal()}>
        {c()}
      </div>

      <dialog id={`m_modal_${props.manager.id}`} class="modal">
        <form method="dialog" class="modal-box">
          <h3 class="text-xl flex flex-row space-x-2">{props.manager.name}</h3>
          <div class="py-4">
            <table class="table">
              <thead>
                <tr>
                  <td>BYE</td>
                  <td>POS</td>
                  <td>Player</td>
                  <td>Price</td>
                </tr>
              </thead>
              <For each={players()}>
                {(player) => (
                  <tr>
                    <td>{byeMap.get(player.teamName)}</td>
                    <td>{player.position}</td>
                    <td class="flex flex-row space-x-2">
                      <a
                        class="link link-hover"
                        target="_blank"
                        href={getPlayerNewsHref(player.name)}
                      >
                        {player.name}
                      </a>
                      <div class=" text-base-content/50">
                        <a
                          class="link link-hover"
                          target="_blank"
                          href={getTeamHref(player.teamName)}
                        >
                          {player.teamName}
                        </a>
                      </div>
                    </td>
                    <td>${player.price}</td>
                  </tr>
                )}
              </For>
            </table>
          </div>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>hidden close</button>
        </form>
      </dialog>
    </>
  );
};

export default ManagerModal;
