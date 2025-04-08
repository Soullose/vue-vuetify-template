// src/theme/index.js
export const themeColors = {
  light: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    success: '#4CAF50',
    warning: '#FB8C00',
    info: '#2196F3'
  },
  dark: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#FF4081',
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FB8C00',
    info: '#2196F3'
  }
};

// 更新 UnoCSS 配置的函数
export function updateUnocssTheme(darkMode = false) {
  const colors = darkMode ? themeColors.dark : themeColors.light;
  return {
    colors
  };
}
