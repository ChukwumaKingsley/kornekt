import { ChakraProvider, CSSReset, extendTheme, ThemeConfig } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


//pages
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import Posts from './pages/Posts';
import NotFoundLoggedIn from './pages/NotFoundLoggedIn';
import MyLikes from './pages/MyLikes';
import MyDislikes from './pages/MyDislikes';

//Layouts
import LandingPage from './layouts/LandingPage';
import HomePage from './layouts/HomePage';
import Activity from './layouts/Activity';

//context for authentication
import { UserContextProvider } from './contexts/UserContext';
import Users from './pages/Users';
import MyPosts from './pages/MyPosts';
import Drafts from './pages/Drafts';
import User from './layouts/User';
import UserPosts from './pages/UserPosts';
import UserLikes from './pages/UserLikes';
import UserDislikes from './pages/UserDislikes';


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
        <Route path='my_profile' element={<MyProfile />} />
        <Route path='users' element={<Users />} />
        <Route path='user/:id/' element={<User />}>
          <Route index element={<UserPosts />}/>
          <Route path='likes' element={<UserLikes />} />
          <Route path='dislikes' element={<UserDislikes />} />
        </Route>
        <Route path='activity' element={<Activity />}>
          <Route index element={<MyPosts />} />
          <Route path='likes' element={<MyLikes />} />
          <Route path='dislikes' element={<MyDislikes />} />
          <Route path='drafts' element={<Drafts />} />
        </Route>
      </Route>
        
        <Route path='*' element={<NotFoundLoggedIn />}/>
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
