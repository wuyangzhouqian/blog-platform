module.exports = {
    extends: "eslint:recommended",
    rules: {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        // disable rules from base configurations
        "no-console": "off",
    },
    env: {
        "browser": true,
        "node": true,
        "es6":true
    },
    parserOptions: {
        "ecmaVersion": 9,
        "sourceType": "module"
    }
}