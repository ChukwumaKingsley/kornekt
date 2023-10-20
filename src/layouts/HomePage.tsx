import {
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function HomePage() {

    // const toast = useToast()

    // if (!localStorage.getItem("token")){
    //     toast(
    //         {
    //             title: "Login required",
    //             status: "warning",
    //             position: "top",
    //         }
    //     )
    //     window.location.href = "/";
    // } else {
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
// }
