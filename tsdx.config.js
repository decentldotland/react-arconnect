const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [
                    tailwindcss({
                        purge: ['./src/**/*.{js,jsx,ts,tsx}'],
                        darkMode: false, // or 'media' or 'class'
                        theme: {
                            extend: {},
                        },
                        variants: {
                            extend: {},
                        },
                        plugins: [
                            require("@tailwindcss/aspect-ratio"),
                            require("@tailwindcss/typography"),
                            require("daisyui"),
                          ],
                    }),
                    autoprefixer(),
                ],
                inject: true,
                // only write out CSS for the first bundle (avoids pointless extra files):
                extract: !!options.writeMeta,
            })
        );
        return config;
    },
};