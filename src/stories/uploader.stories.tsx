import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import Uploader from "../component/ui/Uploader/Uploader";
import { FiUser } from "react-icons/fi";

const meta: Meta<typeof Uploader> = {
  title: "UI/Uploader",
  component: Uploader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;
// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Primary: Story = {
  args: {

  },
  play: async ({ canvasElement }) => {
    //const canvas = within(canvasElement);
  }
}