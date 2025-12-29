export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBF5FB",
          100: "#D4E9F7",
          200: "#A9D3EF",
          300: "#7FBDE7",
          400: "#54A7DF",
          500: "#1351B4",
          600: "#0F4193",
          700: "#0C326F", 
          800: "#08224A",
          900: "#041125",
          DEFAULT: "#1351B4",
        },

        secondary: {
          50: "#FEF3E8",
          100: "#FCE7D1",
          200: "#F9CFA3",
          300: "#F6B775",
          400: "#F39F47",
          500: "#F08619", 
          700: "#90500F",
          800: "#60360A",
          900: "#301B05",
          DEFAULT: "#F08619",
        },
        accent: {
          50: "#E6F7F5",
          100: "#CCEFEB",
          200: "#99DFD7",
          300: "#66CFC3",
          400: "#33BFAF",
          500: "#00AF9B", 
          600: "#008C7C",
          700: "#00695D",
          800: "#00463E",
          900: "#00231F",
          DEFAULT: "#00AF9B",
        },
     
        neutral: {
          50: "#F8F9FA",   
          100: "#EDEFF2", 
          200: "#DCDFE3", 
          300: "#ADADAD", 
          400: "#888D94", 
          500: "#6C717A",  
          600: "#565C65",  
          700: "#43464A",  
          800: "#2E2F31",  
          900: "#1C1D1F",  
        },
        success: {
          DEFAULT: "#168821", 
          light: "#D4EDDA",
          dark: "#0F5C16",
        },
        warning: {
          DEFAULT: "#FFCD07", 
          light: "#FFF9DB",
          dark: "#B38F05",
        },
        error: {
          DEFAULT: "#E52207", 
          light: "#F8D7DA",
          dark: "#A01805",
        },
        info: {
          DEFAULT: "#155BCB", 
          light: "#D4E3F7",
          dark: "#0E3D8A",
        },
        text: {
          primary: "#1C1D1F",    
          secondary: "#43464A", 
          disabled: "#ADADAD", 
        },
        
        bg: {
          body: "#F8F9FA",    
          surface: "#FFFFFF",
        },
        border: "#DCDFE3", 
        educationAlert: "#C90000", 
        educationSecondary: "#F77829", 
        educationOrangeDark: "#E85900", 
        educationOrangeLight: "#FFEDDF", 
        educationCreamBg: "#FFFAF6", 
        educationDarkBlue: "#09316F", 
        educationGrayText: "#666666",
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
