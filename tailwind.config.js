/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: "Roboto, sans-serif",
            },
            colors: {
                "rocket-green": {
                    300: "#04D361",
                    500: "#00B37E",
                    700: "#00875F",
                },
                "rocket-purple": {
                    700: "#996DFF",
                },
                "rocket-orange": {
                    700: "#FBA94C",
                },
                "rocket-red": {
                    700: "#F75A68",
                },
                "rocket-gray": {
                    100: "#E1E1E6",
                    200: "#C4C4CC",
                    300: "#7C7C8A",
                    400: "#323238",
                    500: "#29292E",
                    600: "#202024",
                    700: "#121214",
                },
            },
        },
    },
    plugins: [],
};
