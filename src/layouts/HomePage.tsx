import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <SimpleGrid columns={6}>
        <Sidebar />
        <Flex flexDir={'column'} height={'100vh'} gridColumn={'span 5'} bg={'white'} >
            <Header />
            <Outlet />
        </Flex>
    </SimpleGrid>
  );
}
