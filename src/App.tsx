import { ChakraProvider, CSSReset, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


//pages
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';

//Layouts
import LandingPage from './layouts/LandingPage';
import Posts from './pages/Posts';
import HomePage from './layouts/HomePage';
import NotFound from './pages/NotFound';
import NotFoundLoggedIn from './pages/NotFoundLoggedIn';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const themeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config: themeConfig });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='/' element={<LandingPage />}>
        <Route index element={<Login />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Help />} />
        <Route path='*' element={<NotFound />}/>
        {/* <Route path='posts' element={<Posts /> } /> */}
      </Route>
      <Route path='home' element={<HomePage />}>
        <Route path='posts' element={<Posts />} />
        <Route path='*' element={<NotFoundLoggedIn />}/>
      </Route>
    </Route>
  )
  )

  const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
