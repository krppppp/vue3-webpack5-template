module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    rules: {
        'vue/no-unused-vars': 'error',
        'indent': ['error', 4],
        'vue/html-indent': [ 'error', 4],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                'multiline': 'never',
            },
        ],
    },
};
