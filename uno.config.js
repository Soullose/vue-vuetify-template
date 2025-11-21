// uno.config.js
// import presetIcons from '@unocss/preset-icons';
// import presetUno from '@unocss/preset-uno';
// import presetWebFonts from '@unocss/preset-web-fonts';
// import presetWind3 from '@unocss/preset-wind3';
// import presetAttributify from '@unocss/transformer-attributify-jsx';
// import transformerVariantGroup from '@unocss/transformer-variant-group';
// import defineConfig from '@unocss/webpack';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';
import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup } from 'unocss';
export default defineConfig({
  presets: [
    // presetWind3(),
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
    presetWebFonts({
      provider: 'google', // 默认提供商
      fonts: {
        // 这些将扩展默认主题
        sans: 'Roboto',
        mono: ['Fira Code', 'Fira Mono:400,700'],
        // 自定义的
        lobster: 'Lobster',
        lato: [
          {
            name: 'Lato',
            weights: ['400', '700'],
            italic: true
          },
          {
            name: 'sans-serif',
            provider: 'none'
          }
        ]
      },
      processors: createLocalFontProcessor({})
    })
  ],
  transformers: [transformerVariantGroup()]
});
