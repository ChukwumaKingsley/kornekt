import { Text, Spacer, Flex, Avatar, VStack } from '@chakra-ui/react';
import {  } from '@chakra-ui/react'

const UserCard = (props: any) => {

  return (
          <Flex maxWidth={'400px'}  width={"90%"} ml='20px' mb={'20px'} alignSelf={'center'} alignItems={'center'} borderBottom={'1px'} borderColor={'gray.600'} p={'10px'}>

            <Avatar size={'md'} marginRight={'5px'} bg='blue.900' bgSize={'inherit'} src={'hll'} name={props.user_name} />
            <VStack ml={'10px'}>
              <Text fontSize="sm" color="gray.500" mb={'1px'}>
                {props.user_name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {props.email}
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              Joined on {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(props.created_at).getMonth()]} {new Date(props.created_at).getFullYear()}
            </Text>
          </Flex>
  );
};

    
export default UserCard