import {
  Accessor,
  For,
  JSXElement,
  Show,
  children,
  createSignal,
} from "solid-js";
import { IManager } from "@models/manager";
import { generateByeMap } from "~/api/team";
import { INflTeam } from "@models/nflTeam";
import { getPlayerNewsHref, getTeamHref, removePlayer } from "~/api/player";
import { IPlayer } from "@models/player";
import { AiOutlineEdit, AiOutlineSave } from "solid-icons/ai";
import { FiEdit3, FiSave, FiTrash } from "solid-icons/fi";
import { useQueryClient } from "@tanstack/solid-query";
import DraftPlayerModal from "~/components/player/DraftPlayerModal";
import { updateManagerName } from "~/api/manager";
declare const window: any;
const ManagerEditableName = (props: { manager: IManager }) => {
  const [managerName, setManagerName] = createSignal(props.manager.name);
  const [editing, setEditing] = createSignal(false);
  const queryClient = useQueryClient();
  const handleSave = async () => {
    setEditing(false);
    await updateManagerName(props.manager.id, managerName());
    queryClient.invalidateQueries();
  };
  return (
    <Show
      when={editing()}
      fallback={
        <div class="flex space-x-2 items-center">
          <h3 class="text-xl flex flex-row space-x-2">{props.manager.name}</h3>
          <FiEdit3
            class=" text-2xl font-extrabold hover:text-info"
            onclick={() => setEditing(true)}
          />
        </div>
      }
    >
      <div class="flex space-x-2 items-center">
        <input
          value={managerName()}
          onchange={(e) => setManagerName(e.target.value)}
          class="input input-bordered w-full max-w-xs"
        />
        <FiSave
          class="text-2xl font-extrabold hover:text-info"
          onclick={handleSave}
        />
      </div>
    </Show>
  );
};

const ManagerModal = (props: {
  managers: Accessor<IManager[]>;
  manager: IManager;
  teams: INflTeam[];
  children: JSXElement;
}) => {
  const queryClient = useQueryClient();

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
      props.manager.players?.filter((p) => p.position === "DEF") ?? [];
    return [qbs, rbs, wrs, tes, ks, dsts].flat();
  };

  const handleRemove = async (playerId: number) => {
    await removePlayer(playerId);
    queryClient.invalidateQueries();
  };

  return (
    <>
      <div onclick={() => window[`m_modal_${props.manager.id}`].showModal()}>
        {c()}
      </div>

      <dialog id={`m_modal_${props.manager.id}`} class="modal">
        <form method="dialog" class="modal-box">
          <ManagerEditableName manager={props.manager} />
          <div class="py-4">
            <table class="table">
              <thead>
                <tr>
                  <td>BYE</td>
                  <td>POS</td>
                  <td>Player</td>
                  <td>Price</td>
                  <td></td>
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
                    <td class="flex space-x-2">
                      <DraftPlayerModal
                        onclick={() =>
                          window[`m_modal_${props.manager.id}`].close()
                        }
                        player={player}
                        managers={props.managers}
                      />

                      <button>
                        <FiTrash
                          class="text-xl font-extrabold hover:text-error"
                          onclick={() => handleRemove(player.id)}
                        />
                      </button>
                    </td>
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
