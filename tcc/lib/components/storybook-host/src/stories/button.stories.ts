import type { Meta, StoryObj } from "@storybook/angular";

import { Button } from "@tcc/components/buttons"

const meta: Meta<Button> = {
    component: Button
}

export default meta;

type Story = StoryObj<Button>;

export const PrimaryButton: Story = {};
