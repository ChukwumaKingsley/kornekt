import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blue.50', // Set the background color to blue
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>,
)
