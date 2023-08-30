import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillStar,
  AiOutlineStar,
} from "solid-icons/ai";
import { FiShare } from "solid-icons/fi";
import NflTeam, { Bye, INflTeam, TeamName } from "@models/nflTeam";
import { IPlayer, Position } from "@models/player";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
  createSolidTable,
  getPaginationRowModel,
} from "@tanstack/solid-table";
import { createSignal, For, JSXElement, Show } from "solid-js";

import {
  getPlayerNewsHref,
  getPlayers,
  getTeamHref,
  toggleWish,
} from "~/api/player";
import {
  QueryClient,
  createMutation,
  createQuery,
  useQueryClient,
} from "@tanstack/solid-query";
import AuctionPlayerModal from "~/components/player/AuctionPlayerModal";
import { getManagers } from "~/api/manager";
import { IManager } from "@models/manager";

export type TableFilter = Position | "flex" | "all";

const PlayerTable = (props: { teams: INflTeam[]; managers: IManager[] }) => {
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [filter, setFilter] = createSignal<TableFilter>("all");

  const queryClient: QueryClient = useQueryClient();
  const pQuery = createQuery(() => ["players"], getPlayers);
  const players = () => pQuery.data ?? [];

  const shared = sharedCols(props.teams, queryClient, props.managers);
  const unique = filteredCols(filter());
  const columns: ColumnDef<IPlayer>[] = [...shared, ...unique];

  const table = createSolidTable({
    get data() {
      return players();
    },
    columns,
    state: {
      get sorting() {
        return sorting();
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  table.setPageSize(50);
  return (
    <div class="w-full">
      <table class="table w-full table-sm table-zebra table-pin-rows">
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr class="bg-primary">
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th
                      class="text-primary-content  fill-primary-content"
                      colSpan={header.colSpan}
                    >
                      <Show when={!header.isPlaceholder}>
                        <div
                          class={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex space-x-2"
                              : undefined
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <AiFillCaretUp />,
                            desc: <AiFillCaretDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </Show>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows.slice(0, 50)}>
            {(row) => (
              <tr class="hover">
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>

      <div class="flex items-center gap-2">
        <button
          class="border rounded p-1"
          onclick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          class="border rounded p-1"
          onclick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          class="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          class="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            placeholder={"" + table.getState().pagination.pageIndex + 1}
            onchange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            class="border p-1 rounded w-16"
          />
        </span>
        {/* <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  );
};

//#region helper functions
const generateByeMap = (teams: INflTeam[]) =>
  new Map<TeamName, Bye>(teams.map((team) => [team.name, team.bye]));

const sharedCols = (
  teams: INflTeam[],
  queryClient: QueryClient,
  managers: IManager[]
) => {
  interface NameCol {
    id: number;
    name: string;
    pos: Position;
    team: TeamName;
  }
  interface WishCol {
    id: number;
    wishlist: boolean;
  }

  const byeMap = generateByeMap(teams);
  const cols: ColumnDef<IPlayer>[] = [
    {
      accessorFn: (row) => ({
        id: row.id,
        wishlist: row.wishlist,
      }),
      id: "wishlist",
      cell: (data) => {
        const w = data.getValue<WishCol>();
        return (
          <div
            onclick={async () => {
              await toggleWish(w.id, w.wishlist);
              queryClient.invalidateQueries(["players"]);
            }}
            class="text-xl hover:scale-105"
          >
            <Show when={w.wishlist} fallback={<AiOutlineStar />}>
              <AiFillStar />
            </Show>
          </div>
        ) as JSXElement;
      },
      header: () => <></>,
    },
    {
      accessorKey: "adp",
      cell: (data) => data.getValue(),
      header: () => <span>ADP</span>,
    },
    {
      accessorFn: (row) => ({
        ...row,
      }),
      id: "player",
      cell: (row) => {
        const data = row.getValue<IPlayer>();
        return (
          <div class="flex flex-row space-x-2">
            <AuctionPlayerModal player={data} managers={managers} />

            <a
              class="link link-hover"
              target="_blank"
              href={getPlayerNewsHref(data.name)}
            >
              {data.name}
            </a>
            <div class=" text-base-content/50">
              <a
                class="link link-hover"
                target="_blank"
                href={getTeamHref(data.teamName)}
              >
                {data.teamName}
              </a>
              {" - "}
              <span>{data.position}</span>
            </div>
          </div>
        );
      },
      header: () => <span>Player</span>,
    },
    {
      accessorFn: (row) => row.teamName,
      id: "bye",
      cell: (teamName) => byeMap.get(teamName.getValue<TeamName>()),
      header: () => <span>Bye</span>,
    },
    {
      accessorKey: "totalPoints",
      cell: (data) => data.getValue(),
      header: () => <span>Fan Pts</span>,
    },
    {
      accessorKey: "pointsPerGame",
      cell: (data) => data.getValue(),
      header: () => <span>PPG</span>,
    },
    {
      accessorKey: "gamesPlayed",
      cell: (data) => data.getValue(),
      header: () => <span>GP</span>,
    },
  ];

  return cols;
};

const qbCols = () => {
  const cols: ColumnDef<IPlayer>[] = [
    {
      accessorKey: "passYards",
      cell: (data) => data.getValue(),
      header: () => <span>Pass Yds</span>,
    },
    {
      accessorKey: "passTds",
      cell: (data) => data.getValue(),
      header: () => <span>Pass TD</span>,
    },
    {
      accessorKey: "interceptions",
      cell: (data) => data.getValue(),
      header: () => <span>Int</span>,
    },
  ];
  return cols;
};

const wrCols = () => {
  const cols: ColumnDef<IPlayer>[] = [
    {
      accessorKey: "targets",
      cell: (data) => data.getValue(),
      header: () => <span>Targets</span>,
    },
    {
      accessorKey: "receptions",
      cell: (data) => data.getValue(),
      header: () => <span>Rec</span>,
    },
    {
      accessorKey: "recYards",
      cell: (data) => data.getValue(),
      header: () => <span>Rec Yds</span>,
    },
    {
      accessorKey: "recTds",
      cell: (data) => data.getValue(),
      header: () => <span>Rec TD</span>,
    },
  ];
  return cols;
};

const rbCols = () => {
  const cols: ColumnDef<IPlayer>[] = [
    {
      accessorKey: "rushAttempts",
      cell: (data) => data.getValue(),
      header: () => <span>Rush Att</span>,
    },
    {
      accessorKey: "rushYards",
      cell: (data) => data.getValue(),
      header: () => <span>Rush Yds</span>,
    },
    {
      accessorKey: "rushTds",
      cell: (data) => data.getValue(),
      header: () => <span>Rush TD</span>,
    },
    {
      accessorKey: "targets",
      cell: (data) => data.getValue(),
      header: () => <span>Targets</span>,
    },
  ];
  return cols;
};

const filteredCols = (filter: TableFilter) => {
  const fumb: ColumnDef<IPlayer> = {
    accessorKey: "fumbles",
    cell: (data) => data.getValue(),
    header: () => <span>Fum Lost</span>,
  };
  switch (filter) {
    case "RB":
      return [...rbCols(), ...wrCols(), ...qbCols(), fumb];
    case "TE":
    case "WR":
      return [...wrCols(), ...rbCols(), ...qbCols(), fumb];
    case "K":
    case "DST":
      return [];
    default: //qb or all others
      return [...qbCols(), ...wrCols(), ...rbCols(), fumb];
  }
};

//#endregion helper functions

export default PlayerTable;
