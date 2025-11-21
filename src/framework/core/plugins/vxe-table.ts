import { VxeColgroup, VxeColumn, VxeGrid, VxeTable, VxeToolbar, VxeUI } from 'vxe-table';

// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss';

// 导入默认的语言
import VxeUITable from 'vxe-table';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

VxeUI.setI18n('zh-CN', zhCN);
VxeUI.setLanguage('zh-CN');

// 注册组件
// 如果页面中已经被显性导入了，则可以不用调用注册
// 如果是配置式的，没有在页面中显性导入，则需要逐个注册
VxeUI.component(VxeTable);
VxeUI.component(VxeColumn);
VxeUI.component(VxeColgroup);
VxeUI.component(VxeGrid);
VxeUI.component(VxeToolbar);

import type { InstallPlugin } from '@/framework/utils/types';

export const install: InstallPlugin = (app) => {
  app.use(VxeUITable);
  return createPinia();
};
