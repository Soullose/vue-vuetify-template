// uno.config.js
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import presetAttributify from '@unocss/transformer-attributify-jsx';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import defineConfig from '@unocss/webpack';
// import { defineConfig, presetAttributify, presetIcons, presetUno, transformerVariantGroup } from 'unocss';
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      /* options */
      collections: {
        carbon: () => import('@iconify/json/json/carbon.json').then((i) => i.default),
        mdi: () => import('@iconify/json/json/mdi.json').then((i) => i.default),
        fa: () => import('@iconify/json/json/fa.json').then((i) => i.default)
      }
    }),
    presetWebFonts({})
  ],
  transformers: [transformerVariantGroup()]
});
