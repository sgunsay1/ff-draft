import { IManager } from "@models/manager";
import { IPlayer, Position } from "@models/player";
import type { Meta, StoryObj } from "storybook-solidjs";
import PlayerCircle from "~/components/manager/PlayerCircle";
import TeamBox from "~/components/manager/TeamBox";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Manager/TeamBox",
  component: TeamBox,
  tags: ["autodocs"],
  args: {
    benchSize: 14,
    totalBudget: 200,
  },
} satisfies Meta<typeof TeamBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
const manager: IManager = {
  name: "Roger",
};

const player: IPlayer = {
  wishlist: false,
  price: 0,
  name: "",
  adp: 0,
  position: "QB",
  totalPoints: 0,
  pointsPerGame: 0,
  gamesPlayed: 0,
  completions: 0,
  passYards: 0,
  passTds: 0,
  interceptions: 0,
  rushAttempts: 0,
  rushYards: 0,
  rushTds: 0,
  targets: 0,
  receptions: 0,
  recYards: 0,
  recTds: 0,
  fumbles: 0,
  teamName: "ARI",
};

const positions: Position[] = ["QB", "QB", "RB", "WR", "WR", "WR", "K"];

const samplePlayer: IPlayer = {
  wishlist: false,
  price: 1,
  name: "",
  adp: 0,
  position: "QB",
  totalPoints: 0,
  pointsPerGame: 0,
  gamesPlayed: 0,
  completions: 0,
  passYards: 0,
  passTds: 0,
  interceptions: 0,
  rushAttempts: 0,
  rushYards: 0,
  rushTds: 0,
  targets: 0,
  receptions: 0,
  recYards: 0,
  recTds: 0,
  fumbles: 0,
  teamName: "ARI",
};

const players = positions.map((pos) => {
  const player = { ...samplePlayer };
  player.position = pos;
  console.log("story player", player);
  return player;
});

export const Primary: Story = {
  args: {
    manager,
    players,
  },
};
