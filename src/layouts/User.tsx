import { Avatar, Box, Container, Divider, Flex, Grid, GridItem, HStack, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import http from "../utils/http";
import { formatJoinDate } from "../pages/MyProfile";

export default function User() {

  
  const { pathname } = useLocation()
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
		queryKey: ["getUserProfile", id],
		queryFn: () => http.get(`/users/user/${id}`).then((r) => r.data),
	});

  if (isError) {
    return <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} ><Text fontSize={'24px'} alignSelf={"center"} justifySelf={'center'}>Server not reachable</Text></Flex>;
  }

  return (
    <Grid  
      templateColumns='repeat(3, 1fr)' 
      overflowY={"auto"}
      // height={'95svh'} 
      rowGap={'20px'}
    >
      <GridItem
        colSpan={3}
      >
         <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} >
        {isLoading && <Spinner color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
        {!isLoading &&
        <Box width='80%' height={'250px'} p={'10px'} bg="white" borderRadius="md" boxShadow="md">
          <Container justifyContent={'center'} marginBottom={'5px'}>
            <Flex p={2} 
              flexDir='column' 
              alignItems='center' 
              mb={"5px"}
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

              <Flex alignItems={'center'} flexWrap={'wrap'}>
              <Text>{data?.email}</Text>
              <Box width={'100px'} marginLeft={'auto'} textAlign={'center'}>
                  <Text fontSize={'12px'}>Joined since</Text>
                  <Text>{formatJoinDate(data?.created_at)}</Text>
              </Box>
          </Flex>
          </Container>
          <Divider size={'5px'}/>
          <HStack fontSize={{base: '12px', md: '18px'}} justifyContent="space-between" padding={'5px'}>
              <Text as={NavLink} to={`/home/user/${id}`}>Posts: {data?.posts_count}</Text>
              <Text as={NavLink} to={`/home/user/${id}/likes`}>Likes: {data?.votes_count}</Text>
              <Text as={NavLink} to={`/home/user/${id}/dislikes`}>Dislikes: {data?.downvotes_count}</Text>
          </HStack>
        </Box>
        }
      </Flex>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Posts</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}/likes` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}/likes`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Liked</Text>
      </GridItem>
      <GridItem 
        colSpan={1}
        textAlign='center' 
        background={pathname === `/home/user/${id}/dislikes` ? 'gray.400' : ''}
        height={'30px'}
        as={NavLink}
        to={`/home/user/${id}/dislikes`}
        textColor={'blue.900'}
        fontSize={'18px'}
      >
        <Text>Disliked</Text>
      </GridItem>
      <GridItem colSpan={3} justifyItems={'start'}>
        <Outlet />
      </GridItem>
    </Grid>
  )
}
