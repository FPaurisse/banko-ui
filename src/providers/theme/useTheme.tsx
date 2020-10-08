export type ThemeContextValues = {
    theme: 'dark' | 'light';
};

export const useTheme = (): ThemeContextValues => {
    return {
        theme: 'light'
    };
};
