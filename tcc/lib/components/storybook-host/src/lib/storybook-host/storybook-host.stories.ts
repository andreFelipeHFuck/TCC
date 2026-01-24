import type { Meta, StoryObj } from '@storybook/angular';
import { StorybookHost } from './storybook-host';
import { expect } from 'storybook/test';

const meta: Meta<StorybookHost> = {
  component: StorybookHost,
  title: 'StorybookHost',
};
export default meta;

type Story = StoryObj<StorybookHost>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/storybook-host/gi)).toBeTruthy();
  },
};
