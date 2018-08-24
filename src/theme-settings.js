import React from 'react';

export const themes = {
    light: {
        text: "#000000",
        background: "#CCCCCC"
    },
    dark: {
        text: "#FFFFFF",
        background: "#EEEEEE"
    }
}

export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}
});