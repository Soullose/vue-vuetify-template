/**
 * 定义类型
 */
interface ThemeState {
  theme: String;
  asideMenuFolded: Boolean;
}

export const theme = defineStore('theme', {
  state: (): ThemeState => {
    return {
      theme: 'light',
      asideMenuFolded: false
    };
  },
  actions: {
    setAsideMenuFolded(asideMenuFolded: Boolean) {
      this.asideMenuFolded = asideMenuFolded;
    },
    setTheme(theme: String) {
      this.theme = theme;
    }
  },
  getters: {
    getAsideMenuFolded: (state) => state.asideMenuFolded,
    getTheme: (state) => state.theme
  }
});
