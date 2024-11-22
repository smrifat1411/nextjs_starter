import { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#C7675E',
    // colorInfo: '#0f71c8',
    // colorSuccess: '#1677ff',
    colorPrimaryBg: 'white',
    colorBgContainer: 'white',
    fontSize: 13,
  },
  components: {
    Button: {
      colorBgBase: '#0f71c8',
    },
    Input: {
      colorBorder: '#C4CDD5',
      colorBgContainer: 'white',
      borderRadius: 6,
    },
    Menu: {
      itemColor: '#919EAB',
      itemSelectedColor: '#C7675E',
      itemHoverBg: '#f5cdc9',
      itemBorderRadius: 8,
      itemSelectedBg: 'white',
      itemHoverColor: '#C7675E',
      fontSize: 14,
    },
    Form: {
      // labelFontSize: 12,
      // labelColor: "#7A828E",
    },
  },
};
