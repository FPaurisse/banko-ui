module.exports = {
    parser: '@typescript-eslint/parser', 
    parserOptions: {
        ecmaVersion: 2020, 
        sourceType: 'module', 
        ecmaFeatures: {
            jsx: true,  
        },
    },
    settings: {
        react: {
            version: 'detect',  
        },
    },
    plugins: ['react', 'react-hooks'],
    extends: [
        'plugin:react-hooks/recommended', // react hooks rules
        'plugin:react/recommended', 
        'plugin:@typescript-eslint/recommended',  
    ],
    rules: {
        'react/display-name': 'off',  
        'react-hooks/exhaustive-deps': 'off', // should be remove at the end :)  
        '@typescript-eslint/explicit-function-return-type': [2, {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        }],
        'arrow-parens': ['error', 'always'],
        'indent': ['error', 4],
        'quotes': [2, 'single'],
        'quote-props': [2, 'consistent-as-needed'],
        'object-curly-spacing': [2, 'always'],
        'react/jsx-curly-spacing': [
            2,
            {
                when: 'always',
                children: {
                    when: 'always',
                },
                spacing: {
                    objectLiterals: 'always',
                },
            },
        ],
        'react/prop-types': 0,
    },
};
