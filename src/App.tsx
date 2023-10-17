import { ChakraProvider, CSSReset, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


//pages
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';

//Layouts
import LandingPage from './layouts/LandingPage';


const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config: themeConfig });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LandingPage />}>
      <Route index element={<Login />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Help />} />
    </Route>
  )
  )

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
