import type { Meta, StoryObj } from "storybook-solidjs";
import AuctionPlayerModal from "~/components/player/AuctionPlayerModal";
import { PlayerData } from "~/stories/player/players.data";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Player/AuctionPlayerModal",
  component: AuctionPlayerModal,
  tags: ["autodocs"],
} satisfies Meta<typeof AuctionPlayerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    ...PlayerData[0],
  },
};

export const Secondary: Story = {
  args: {
    ...PlayerData[2],
  },
};
