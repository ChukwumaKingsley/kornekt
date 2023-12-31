import { Avatar, Flex, Spinner, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import useMyProfile from '../hooks/useMyProfile';

export default function UserAvartar({size, show}: {size: {base: string; md: string;}, show: boolean}) {

  const { isLoading, data } = useMyProfile();
  return (
    <Flex p={2} 
        flexDir='column' 
        alignItems='center'
        as={NavLink} 
        to="/home/my_profile" 
        mb={"10px"}
        textAlign={'center'}
    >
        {
            isLoading ? <Spinner /> :
            <div><Avatar size={size} bg='blue.900' bgSize={'inherit'} src={data?.profile_pic} name={data?.name} />
            {show && <Text>{data?.name}</Text>}</div>
        }
    </Flex>
  )
}
