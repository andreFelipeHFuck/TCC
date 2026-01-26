import type { Preview } from "@storybook/angular";

import '@tcc/material/styles';
// import '@angular/material/prebuilt-themes/indigo-pink.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
