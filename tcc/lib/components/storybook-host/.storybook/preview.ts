import { applicationConfig, type Preview } from "@storybook/angular";
import { provideAnimations } from '@angular/platform-browser/animations';

import '@tcc/styles/material';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
  ],
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
