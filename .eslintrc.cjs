module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier'
    ],
    plugins: ['check-file', 'unsued-imports'],
    rules: {
        'no-undef': 'off',
    }
}