import { Accessor, For, createEffect, createSignal } from "solid-js";
import { IPlayer } from "@models/player";
import { FiShare } from "solid-icons/fi";
import { getPlayerNewsHref, getTeamHref, purchasePlayer } from "~/api/player";
import { IManager } from "@models/manager";
import { useQueryClient } from "@tanstack/solid-query";
declare const window: any;
const DraftPlayerModal = (props: {
  player: IPlayer;
  managers: Accessor<IManager[]>;
  onclick?: () => void;
}) => {
  const [bid, setBid] = createSignal(props.player.price);
  const [manager, setManager] = createSignal<number>(1);

  const queryClient = useQueryClient();
  return (
    <>
      <FiShare
        class="text-xl font-extrabold hover:text-info"
        onclick={() => {
          props.onclick ? props.onclick() : [];
          window[`p_modal_${props.player.id}`].showModal();
        }}
      />
      <dialog id={`p_modal_${props.player.id}`} class="modal">
        <form method="dialog" class="modal-box">
          <div class="flex flex-row justify-between">
            <div>
              <h3 class="text-xl flex flex-row space-x-2">
                <a
                  class="link link-hover"
                  target="_blank"
                  href={getPlayerNewsHref(props.player.name)}
                >
                  {props.player.name}
                </a>
                <div class=" text-base-content/50">
                  <a
                    class="link link-hover"
                    target="_blank"
                    href={getTeamHref(props.player.teamName)}
                  >
                    {props.player.teamName}
                  </a>
                  {" - "}
                  <span>{props.player.position}</span>
                </div>
              </h3>
            </div>
            <span class="text-xl  text-success">
              ${props.player.suggestedPrice}
            </span>
          </div>

          <div class="py-4 flex flex-col space-y-4">
            <label class="label">Manager</label>
            <select
              onchange={(e) => setManager(parseInt(e.target.value))}
              class="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Pick one...
              </option>
              <For each={props.managers()}>
                {(manager) => (
                  <option value={manager.id}>{manager.name}</option>
                )}
              </For>
            </select>

            <label class="label">Bid</label>
            <input
              type="number"
              value={bid()}
              onchange={(e) => setBid(e.target.valueAsNumber)}
              class="input input-bordered w-full max-w-xs"
            />
            <button
              class="btn btn-primary"
              onclick={async () => {
                await purchasePlayer(manager(), props.player.id, bid());
                queryClient.invalidateQueries();
              }}
            >
              Purchase
            </button>
          </div>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>hidden close</button>
        </form>
      </dialog>
    </>
  );
};

export default DraftPlayerModal;
