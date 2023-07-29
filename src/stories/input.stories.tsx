import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import InputUI from "../component/ui/Input/Input";
import { FiUser } from "react-icons/fi";

const meta: Meta<typeof InputUI> = {
  title: "UI/InputUI",
  component: InputUI,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;
// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const InputWithoutOutline: Story = {
  args: {
    labelText: "Hello",
    type: "text",
    name: "name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input");
    await sleep(500);
    await userEvent.type(input, "He");
    await sleep(2000);
    await userEvent.type(input, "llo");
    await sleep(500);
    await userEvent.type(input, " World!");
  },
};
export const WithIcon: Story = {
  args: {
    icon: <FiUser />,
    labelText: "Username",
    type: "text",
    name: "name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input");
    await sleep(500);
    await userEvent.type(input, "This");
    await sleep(500);
    await userEvent.type(input, " is");
    await sleep(500);
    await userEvent.type(input, " a input");
    await sleep(500);
    await userEvent.type(input, " component");
    await sleep(500);
    await userEvent.type(input, " with icon.");
  },
};
export const Outlined: Story = {
  args: {
    icon: <FiUser />,
    labelText: "Username",
    isOutlined: true,
    type: "text",
    name: "name",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input");
    await sleep(500);
    await userEvent.type(input, "He");
    await sleep(2000);
    await userEvent.type(input, "llo");
    await sleep(500);
    await userEvent.type(input, " Outlined Input");
  },
};
export const PWDInput: Story = {
  args: {
    type: "password",
    labelText: "Password",
    isOutlined: true,
    name: 'password'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input");
    const button = canvas.getByTestId("pwd-visibility");
    await sleep(500);
    await userEvent.type(input, "Your");
    await sleep(500);
    await userEvent.type(input, "Pass");
    await sleep(500);
    await userEvent.type(input, "Word");
    await sleep(500);
    await userEvent.click(button);
    await sleep(1000);
    await userEvent.click(button);
    await sleep(1000);
    await userEvent.click(button);
  },
};
