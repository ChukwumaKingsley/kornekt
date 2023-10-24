import { ChakraProvider, CSSReset, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


//pages
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';
import NotFoundLoggedIn from './pages/NotFoundLoggedIn';

//Layouts
import LandingPage from './layouts/LandingPage';
import HomePage from './layouts/HomePage';

//context for authentication
import { UserContextProvider } from './contexts/UserContext';
import Users from './pages/Users';


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
        <Route index element={<Posts />} />
        <Route path='my_profile' element={<UserProfile />} />
        <Route path='users' element={<Users />} />
        <Route path='*' element={<NotFoundLoggedIn />}/>
      </Route>
    </Route>
  )
  )

  const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
