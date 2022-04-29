module.exports = {
    spec: ['src/tests/*.spec.js'],
    require: [
        '@babel/register',
        'src/tests/hooks.js',
    ],
};
