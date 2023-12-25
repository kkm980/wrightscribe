export default function generateRandomColor(theme: string) {
    // Define the color code length
    const colorCodeLength = 6;
  
    // Function to generate a random hexadecimal digit
    const getRandomHexDigit = () => Math.floor(Math.random() * 16).toString(16);
  
    // Function to generate a random hexadecimal color code
    const generateColorCode = () => Array.from({ length: colorCodeLength }, getRandomHexDigit).join('');
  
    // Define theme-specific color codes for dark and light themes
    const colorCodes = {
      dark: generateColorCode(),
      light: generateColorCode(),
    };
  
    // Return the color code based on the theme
    return theme === 'dark' ? colorCodes.dark : colorCodes.light;
  }
  
  // Example usage:
  const darkThemeColor = generateRandomColor('dark');
  const lightThemeColor = generateRandomColor('light');
  
  console.log('Dark Theme Color:', darkThemeColor);
  console.log('Light Theme Color:', lightThemeColor);
  