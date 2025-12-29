export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Gov.br Primary Blue (Blue Warm Vivid)
        primary: {
          50: "#EBF5FB",
          100: "#D4E9F7",
          200: "#A9D3EF",
          300: "#7FBDE7",
          400: "#54A7DF",
          500: "#1351B4", // Gov.br Blue Warm Vivid 70
          600: "#0F4193",
          700: "#0C326F", // Gov.br Blue Warm Vivid 80
          800: "#08224A",
          900: "#041125",
          DEFAULT: "#1351B4",
        },
        // Gov.br Secondary Orange
        secondary: {
          50: "#FEF3E8",
          100: "#FCE7D1",
          200: "#F9CFA3",
          300: "#F6B775",
          400: "#F39F47",
          500: "#F08619", // Gov.br Orange
          600: "#C06B14",
          700: "#90500F",
          800: "#60360A",
          900: "#301B05",
          DEFAULT: "#F08619",
        },
        // Gov.br Supporting Teal
        accent: {
          50: "#E6F7F5",
          100: "#CCEFEB",
          200: "#99DFD7",
          300: "#66CFC3",
          400: "#33BFAF",
          500: "#00AF9B", // Gov.br Teal
          600: "#008C7C",
          700: "#00695D",
          800: "#00463E",
          900: "#00231F",
          DEFAULT: "#00AF9B",
        },
        // Gov.br Neutral Scale (Gray Cool)
        neutral: {
          50: "#F8F9FA",   // Gray 2
          100: "#EDEFF2",  // Gray 5
          200: "#DCDFE3",  // Gray 10
          300: "#ADADAD",  // Gray 30
          400: "#888D94",  // Gray 40
          500: "#6C717A",  // Gray 50
          600: "#565C65",  // Gray 60
          700: "#43464A",  // Gray 70
          800: "#2E2F31",  // Gray 80
          900: "#1C1D1F",  // Gray 90
        },
        // Gov.br Semantic Colors
        success: {
          DEFAULT: "#168821", // Gov.br Green Cool Vivid 50
          light: "#D4EDDA",
          dark: "#0F5C16",
        },
        warning: {
          DEFAULT: "#FFCD07", // Gov.br Yellow Vivid 20
          light: "#FFF9DB",
          dark: "#B38F05",
        },
        error: {
          DEFAULT: "#E52207", // Gov.br Red Vivid 50
          light: "#F8D7DA",
          dark: "#A01805",
        },
        info: {
          DEFAULT: "#155BCB", // Gov.br Blue Warm Vivid 60
          light: "#D4E3F7",
          dark: "#0E3D8A",
        },
        // Text colors
        text: {
          primary: "#1C1D1F",    // Gray 90
          secondary: "#43464A",  // Gray 70
          disabled: "#ADADAD",   // Gray 30
        },
        // Background colors
        bg: {
          body: "#F8F9FA",    // Gray 2
          surface: "#FFFFFF",
        },
        // Border color
        border: "#DCDFE3", // Gray 10
        // Additional Education Page Colors
        educationAlert: "#C90000", // Education alerts and emphasis
        educationSecondary: "#F77829", // Orange for secondary elements
        educationOrangeDark: "#E85900", // Dark orange for borders
        educationOrangeLight: "#FFEDDF", // Light orange background
        educationCreamBg: "#FFFAF6", // Cream background
        educationDarkBlue: "#09316F", // Very dark blue for backgrounds
        educationGrayText: "#666666", // Gray text
      },
      fontFamily: {
        sans: [
          "Rawline",
          "Source Sans Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "Rawline",
          "Source Sans Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.12)",
        strong: "0 8px 32px rgba(0, 0, 0, 0.16)",
        "card-hover":
          "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      maxWidth: {
        container: "1200px",
      },
      height: {
        header: "70px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
