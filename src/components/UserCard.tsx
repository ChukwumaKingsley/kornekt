import { Text, Spacer, Flex, Avatar } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const UserCard = (props: any) => {

  return (
          <Flex as={NavLink} to={`/home/user/${props.user_id}`} maxWidth={'800px'}  width={"90%"} ml='20px' mb={'20px'} alignSelf={'center'} alignItems={'center'} borderBottom={'1px'} borderColor={'gray.600'} p={'10px'}>
            <Avatar size={'md'} marginRight={'5px'} bg='blue.900' bgSize={'inherit'} src={props.profile_pic} name={props.user_name} />
            <Flex ml={'10px'} flexDir={'column'}>
              <Text fontSize="sm" color="gray.500" mb={'1px'} textAlign={'left'}>
                {props.user_name}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign={'left'}>
                {props.email}
              </Text>
            </Flex>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              Joined on {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date(props.created_at).getMonth()]} {new Date(props.created_at).getFullYear()}
            </Text>
          </Flex>
  );
};

    
export default UserCard