import presetWind3 from '@unocss/preset-wind3';
import { defineConfig, presetAttributify, transformerVariantGroup } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  presets: [presetWind3(), presetAttributify()],
  theme: {},
  transformers: [transformerVariantGroup()]
});
