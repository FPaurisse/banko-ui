export type ThemeContextValues = {
    theme: 'dark' | 'light';
};

const useTheme = (): ThemeContextValues => {
    return {
        theme: 'light'
    };
};

export default useTheme;
