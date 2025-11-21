/**
 * 定义类型
 */
interface ThemeState {
  theme: String;
}

export const theme = defineStore('theme', {
  state: (): ThemeState => {
    return {
      theme: 'light'
    };
  },
  actions: {
    setTheme(theme: String) {
      this.theme = theme;
    }
  }
});
