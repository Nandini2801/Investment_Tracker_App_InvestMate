import { extendTheme } from "@chakra-ui/react";

function applyDefaultColorScheme(components, colorScheme) {
  const componentStyles = {};

  // Loop through each component and set the default colorScheme
  components.forEach((component) => {
    componentStyles[component] = {
      defaultProps: {
        colorScheme,
      },
    };
  });

  return componentStyles;
}

const defaultColorScheme = "primary"; // Set your default colorScheme here
const allComponents = [
  "Button",
  "Input",
  "Tabs",
  "Table",
  "Thead",
  "Tbody",
  "TR",
  "TH",
  "Select",
  // Add more Chakra UI component names here
];

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#f7f2f8",
      100: "#ebdef5",
      200: "#d7bde2",
      300: "#c39bd3",
      400: "#af7ac3",
      500: "#5A287D", // Your primary color
      600: "#4d2169",
      700: "#431c5b",
      800: "#39184d",
      900: "#2f133f",
    },
    secondary: {
      50: "#fffbea",
      100: "#fff3c4",
      200: "#ffeb9b",
      300: "#ffe373",
      400: "#ffd44a",
      500: "#FFD700", // Secondary color (muted gold)
      600: "#ffb600",
      700: "#ffa200",
      800: "#ff9000",
      900: "#ff8100",
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "var(--bg-color)",
        color: "var(--text-color-primary)",
        lineHeight: "initial",
        fontFamily: "'Poppins', sans-serif",
      },
    }),
  },
  config: {
    // Apply your custom color palette as the default color scheme for all components
    initialColorMode: "light", // You can set this to 'dark' if you prefer a dark theme
    useSystemColorMode: false, // Set this to true if you want to use the system color mode
    // Set your custom color palette as the default color scheme
    defaultColorMode: "light", // You can set this to 'dark' if you prefer a dark theme
    // Apply your custom color palette globally
    cssVarPrefix: "color", // This prefix is important for applying the custom palette
  },
  components: applyDefaultColorScheme(allComponents, defaultColorScheme),
});

export default customTheme;
