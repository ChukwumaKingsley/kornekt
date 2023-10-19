import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useMyProfile from '../hooks/useMyProfile';

export default function UserAvartar({size, show}: {size: string, show: boolean}) {
  const accessToken = localStorage.getItem("token");

  const {  isLoading, data } = useMyProfile(accessToken);

  useEffect(() => {
    if (!accessToken) {
        console.log("Access token not found in local storage");
    }
  }, [accessToken]);


  return (
    <Flex p={2} 
        flexDir='column' 
        alignItems='center' 
        as={NavLink} 
        to="/home/my_profile" 
        mb={"10px"}
    >
        {
            isLoading ? <Spinner /> :
            <div><Avatar size={size} bg='blue.900' bgSize={'inherit'} src={'hll'} name={data?.name} />
            {show && <Text>{data?.name}</Text>}</div>
        }
    </Flex>
  )
}
