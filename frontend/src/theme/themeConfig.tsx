// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#1f2937',
    colorBgContainer: "#ffffff40"
  },
  components: {
    Button: {
      colorBgContainer: "#ffffff00"
    }
  }
};

export default theme;