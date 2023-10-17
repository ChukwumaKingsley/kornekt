import { ChakraProvider, CSSReset, extendTheme, ThemeConfig } from '@chakra-ui/react';
import Header from './components/Header'; // Import the Header component
import LandingPage from './pages/LandingPage'; // Import the LandingPage component

const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config: themeConfig });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
