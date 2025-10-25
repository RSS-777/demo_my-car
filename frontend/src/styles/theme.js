export const common = {
  light: {
    colors: {
      text: {
        default: '#333333',
        reverse: '#FFFFFF',
        heading1: '#1E2A38',
        heading2: '#003588',
        heading3: '#005f40',
        heading4: '#333333',
        heading5: '#555555',
        subtitle: '#5C5C5C',
        mistake: '#D32F2F',
        link: '#333333',
        linkActive: '#006adb',
        cardPrimary: 'black',
        cardSecondary: '#003588',
        muted: '#666',
        fixed: '#000000',
        static: '#444444',
      },
      background: {
        default: '#FAFCFF',
        reverse: '#121212',
        surface: '#f5f5f5',
        linkHover: '#006adb',
        cardPrimary: '#D5EEFF',
        cardSecondary: '#EBEBEB',
        overlayPrimary: '#FFFFFFF5',
        overlaySecondary: '#434343E6'
      },
      table: {
        th: '#004D47',
        td: '#333333',
        border: '#CCCCCC'
      },
      button: {
        default: '#0063D0',
        hover: '#043d7aff',
        disabled: '#B0B0B0',
        text: '#FFFFFF',
        textHover: '#FFFFFF',
        settings: '#646363',
        settingsText: '#FFFFFF',
        settingsHover: '#006adb',
        header: '#008156',
        headerHover: '#23797F',
        close: '#00000080',
        closeHover: '#FFFFFFCC',
        closeText: '#FFFFFF',
        closeTextHover: '#333333',
        cardView: '#E0F0FF',
        cardViewHover: '#D0E8FF',
        cardViewText: '#0035C1',
        cardDelete: '#D32F2F',
        cardDeleteHover: '#b71c1c',
        cardDeleteText: '#FFFFFF',
        tab: '#F5F8FC',
        tabActive: '#006adb',
        tabHover: '#006adb',
        tabText: '#000000',
        tabTextActive: '#FFF',
      },
      boxShadow: {
        default: '#000000',
        reverse: '#FFFFFF',
        active: '#006adb',
      },
      form: {
        label: '#017E3B',
        formBg: '#EBEBEB',
        inputBg: '#FFFFFF',
        inputText: '#333333',
        inputShadow: '#888888',
        placeholder: '#777777',
        disabledBg: '#F5F5F5',
        disabledText: '#B0B0B0',
        overlay: '#848282'
      },
    }
  },
  dark: {
    colors: {
      text: {
        default: '#FFFFFF',
        reverse: '#333333',
        heading1: '#FFFFFF',
        heading2: '#90CAF9',
        heading3: '#7CBF9A',
        heading4: '#B0BEC5',
        heading5: '#9E9E9E',
        subtitle: '#9B9B9B',
        mistake: '#FF6F6F',
        link: '#E0E0E0',
        linkActive: '#EF7851',
        cardPrimary: 'white',
        cardSecondary: '#cf785b',
        muted: '#8D8D8D',
        fixed: '#000000',
        static: '#8D8D8D',
      },
      background: {
        default: '#121212',
        reverse: '#FAFCFF',
        surface: '#262626',
        linkHover: '#EF7851',
        cardPrimary: '#0F172A',
        cardSecondary: '#262626',
        overlayPrimary: '#000000ED',
        overlaySecondary: '#C8C8C8DB',
      },
      table: {
        th: '#4FC1A6',
        td: '#CFCFCF',
        border: '#555555'
      },
      button: {
        default: '#0063D0',
        hover: '#043d7aff',
        disabled: '#666666',
        text: '#FFFFFF',
        textHover: '#A5FFB2',
        settings: '#646363',
        settingsText: '#FFFFFF',
        settingsHover: '#EF7851',
        header: '#008156',
        headerHover: '#23797F',
        close: '#00000080',
        closeHover: '#FFFFFFCC',
        closeText: '#FFFFFF',
        closeTextHover: '#333333',
        cardView: '#E0F0FF',
        cardViewHover: '#D0E8FF',
        cardViewText: '#0035C1',
        cardDelete: '#B10000',
        cardDeleteHover: '#940000',
        cardDeleteText: '#FFFFFF',
        tab: '#F5F8FC',
        tabActive: '#EF7851',
        tabHover: '#EF7851',
        tabText: '#000000',
        tabTextActive: '#FFF',
      },
      boxShadow: {
        default: '#FFFFFF',
        reverse: '#000000',
        active: '#EF7851'
      },
      form: {
        label: '#7CBF9A',
        formBg: '#262626',
        inputBg: '#262626',
        inputText: '#E0E0E0',
        inputShadow: '#999999',
        placeholder: '#757575',
        disabledBg: '#1E1E1E',
        disabledText: '#666666',
        overlay: '#D7D7D7'
      },
    }
  }
};

export const lightTheme = {
  colors: common.light.colors
};

export const darkTheme = {
  colors: common.dark.colors
};