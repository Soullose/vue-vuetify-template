import type { InstallPlugin } from '@/framework/utils/types';
import Vue from 'vue';

function filename(path: string) {
  return path
    .split(/(\\|\/)/g)
    .pop()!
    .replace(/\.[^/.]+$/, '');
}

const plugins = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ install: InstallPlugin }>('./*.ts', {
      eager: true
    })
  )
    .map(([k, v]) => [filename(k), v.install?.(Vue)] as [string, any])
    .filter((entry) => entry[1])
);
export default plugins;
