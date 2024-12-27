// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     flowbite.content(),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     flowbite.plugin(),
//     require('tailwind-scrollbar'),
//     // require('@tailwindcss/line-clamp'),
//   ],
// }


// /** @type {import('tailwindcss').Config} */
// import tailwindScrollbar from 'tailwind-scrollbar';

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite-react/**/*.js", // For flowbite-react components
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     tailwindScrollbar,
//     // require("@tailwindcss/line-clamp"),
//   ],
// };


//=============================================================
//  PREVIOUS LAST ONE
//=============================================================
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}',
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin'),
//     require('tailwind-scrollbar'),
//   ],
// };


// import { defineConfig } from "tailwindcss";
// import tailwindScrollbar from "tailwind-scrollbar";
// import flowbite from "flowbite-react/tailwind";
// export default defineConfig({
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite-react/**/*.js", // For flowbite-react components
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     // require("tailwind-scrollbar"),
//     // require("@tailwindcss/line-clamp"),
//     flowbite,
//     tailwindScrollbar,
//   ],
// }
// );

/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin"; // Import Flowbite's plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Add Flowbite React's content paths
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Add Flowbite as a plugin directly
  ],
};