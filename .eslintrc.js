module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
    },
    "parser": "babel-eslint",
    "ecmaFeatures": {
        "classes": true,
        "jsx": true
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "react/forbid-prop-types": 0,
        "object-curly-newline": 0,
    }
};