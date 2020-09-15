module.exports = {
    collectCoverageFrom: ['**/src/**/*.tsx, ts'],
    coverageThreshold: {
        global: {
            statements: 13,
            branches: 5,
            functions: 17,
            lines: 13,
        },
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        '/cypress/',
        '/src/testUtils/testServer.js',
    ],
}