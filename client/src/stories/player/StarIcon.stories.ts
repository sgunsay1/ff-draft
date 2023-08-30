import type { Meta, StoryObj } from "storybook-solidjs";
import StarIcon from "~/components/player/StarIcon";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Player/StarIcon",
  component: StarIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof StarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    wish: true,
  },
};

export const Secondary: Story = {
  args: {
    wish: false,
  },
};
