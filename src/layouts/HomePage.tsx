import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect } from 'react';

export default function HomePage() {

    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(() => {
      if (!accessToken) {
        // navigate('/')
        console.log(accessToken)
      }
    }, [])
    

  return (
    <SimpleGrid columns={5}>
        <Sidebar />
        <Flex flexDir={'column'} height={'100svh'} gridColumn={{base: 'span 5', md: 'span 4'}} bg={'gray.200'} >
            <Header />
            <Outlet />
        </Flex>
    </SimpleGrid>
  );
}

