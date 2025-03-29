import { createPinia, PiniaVuePlugin } from 'pinia';

import type { InstallPlugin } from '@/framework/utils/types';

export const install: InstallPlugin = (app) => {
  app.use(PiniaVuePlugin);
  return createPinia();
};
