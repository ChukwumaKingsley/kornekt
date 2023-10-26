import { Avatar, Box, Container, Divider, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";


function formatJoinDate(joinDate: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return new Date(joinDate).toLocaleDateString('en-US', options);
  }

function UserProfile() {

  const { id } = useParams();
  console.log(id)
  const { data, isLoading } = useQuery({
		queryKey: ["getUserProfile", id],
		queryFn: () => http.get(`/users/user/${id}`).then((r) => r.data),
	});

  return (
    <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} >
        {isLoading && <Spinner color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
        {!isLoading &&
      <Box width='80%'p={'10px'} bg="white" borderRadius="md" boxShadow="md">
        <Container justifyContent={'center'} marginBottom={10}>
          <Flex p={2} 
            flexDir='column' 
            alignItems='center' 
            mb={"10px"}
            textAlign={'center'}
          >
            <Avatar
              size={'xl'} 
              bg='blue.900' 
              bgSize={'inherit'} 
              src={'hll'} 
              name={data.name}
            />
            <Text>{data.name}</Text>
          </Flex>

            <HStack alignItems={'center'} p={'5px'}>
            <Text>{data?.email}</Text>
            <Box width={'100px'} marginLeft={'auto'} textAlign={'center'}>
                <Text fontSize={'12px'}>Joined since</Text>
                <Text>{formatJoinDate(data?.created_at)}</Text>
            </Box>
        </HStack>
        </Container>
        <Divider size={'5px'}/>
        <HStack justifyContent="space-between" padding={'10px'}>
            <Text as={NavLink} to={'/home/users/${data.}'}>Posts: {data?.posts_count}</Text>
            <Text as={NavLink} to={'/home/activity/likes'}>Likes: {data?.votes_count}</Text>
            <Text as={NavLink} to={'/home/activity/dislikes'}>Dislikes: {data?.downvotes_count}</Text>
        </HStack>
      </Box>
      }
    </Flex>
  );
}

export default UserProfile;
