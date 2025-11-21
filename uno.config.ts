import presetWind3 from '@unocss/preset-wind3';
import { defineConfig, presetAttributify, transformerVariantGroup } from 'unocss';

export default defineConfig({
  // ...UnoCSS options
  rules: [
    // ...UnoCSS rules
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if ((theme as any).colors[c]) return { color: (theme as any)[c] };
      }
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if ((theme as any).colors[c]) return { color: (theme as any)[c] };
      }
    ],
    [
      /^color-(.*)$/,
      ([, c], { theme }) => {
        if ((theme as any).colors[c]) return { color: (theme as any)[c] };
      }
    ]
  ],
  presets: [presetWind3(), presetAttributify()],
  theme: {
    colors: {
      light: {
        primary: '#1565C0',
        secondary: '#50606F',
        tertiary: '#48617B',
        accent: '#9c27b0', // 强调色
        error: '#BA1A1A', // 错误色
        info: '#00bcd4', // 信息色
        success: '#4caf50', // 成功色
        warning: '#ff9800' // 警告色
      },
      dark: {
        primary: '#A9C7FF',
        secondary: '#B8C8D9',
        tertiary: '#AFC9E7',
        accent: '#9c27b0', // 强调色
        error: '#FFB4AB', // 错误色
        info: '#00bcd4', // 信息色
        success: '#4caf50', // 成功色
        warning: '#ff9800' // 警告色
      }
    }
  },
  transformers: [transformerVariantGroup()]
});
