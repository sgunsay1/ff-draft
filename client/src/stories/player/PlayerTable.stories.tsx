import { INflTeam } from "@models/nflTeam";
import { IPlayer } from "@models/player";
import type { Meta, StoryObj } from "storybook-solidjs";
import PlayerTable from "~/components/player/PlayerTable";
import { PlayerData } from "~/stories/player/players.data";
import { TeamData } from "~/stories/player/teams.data";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Player/PlayerTable",
  component: PlayerTable,
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args

export const Primary: Story = {
  args: {
    filter: "WR",
    players: PlayerData,
    teams: TeamData,
  },
};
