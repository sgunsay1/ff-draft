import type { Meta, StoryObj } from "storybook-solidjs";
import PlayerCircle from "~/components/manager/PlayerCircle";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Manager/PlayerCircle",
  component: PlayerCircle,
  tags: ["autodocs"],
} satisfies Meta<typeof PlayerCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    pos: "QB",
    count: 2,
  },
};
