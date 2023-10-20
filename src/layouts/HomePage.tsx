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
        navigate('/')
      }
    }, [])
    

  return (
    <SimpleGrid columns={6}>
        <Sidebar />
        <Flex flexDir={'column'} height={'100vh'} gridColumn={'span 5'} bg={'gray.200'} >
            <Header />
            <Outlet />
        </Flex>
    </SimpleGrid>
  );
}

