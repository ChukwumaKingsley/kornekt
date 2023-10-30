import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Box, Button, Flex, Heading, Text, Input, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function Users() {
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => fetchData(toast, navigate, search),
  });

  useEffect(() => {
    refetch()
  }, [search])
  
  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    refetch()
  }

  if (isError) {
    return <Flex mt={'20px'} flexDirection="column" alignItems="center" p={'10px'} ><Text fontSize={'24px'} alignSelf={"center"} justifySelf={'center'}>Server not reachable</Text></Flex>;
  }



  // Data is available here
  return (
      <Flex mt={'20px'} maxHeight={'100svh'} overflowY={!isLoading ? 'auto' : 'unset'} flexDirection={'column'}>
          <Box alignSelf={'center'}>
            <form onSubmit={handleSearch}>
              <Flex>
                <Input 
                  type="text" 
                  placeholder="Search" 
                  mb={'20px'} 
                  bg={'white'} 
                  borderRadius={'10px'}
                  marginRight={'5px'}
                  onChange={handleSearchChange} 
                  value={search}/>
                <Button colorScheme="blue" borderRadius={'100px'} type="submit">Go</Button>
              </Flex>
            </form>
          </Box>
          {isLoading && <Spinner alignSelf={'center'} color='red.500' size={'xl'} thickness="5px" colorScheme="blue.400" speed="1s" />}
          {!isLoading && <Flex overflowY={!isLoading ? 'auto' : 'unset'} flexDirection={"column"}>
          {data.length > 0 && data.map((user: any) => 
            <UserCard 
            key={user.id}
            user_id={user.id}
            user_name={user.name}
            created_at={user.created_at}
            email={user.email}
            />)}
            {data.length === 0 && <Heading as='h2' mt='50px' alignSelf={'center'} textColor={'blue.400'} >No Users</Heading>}
            </Flex>}
      </Flex>
  );
}

// Define a function to fetch the data
async function fetchData(toast: any, navigate: any, search: any) {
  const accessToken = localStorage.getItem('accessToken')
  try {
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const response = await http.get(`/users/all?search=${search}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    console.log(response)
    return response.data
  } catch (error: any) {
    if (error?.response){
      if (error.response.status === 400){
        toast({
          title: "Invalid access token",
          status: "warning",
          position: "top",
        });
        navigate('/')
      }
    }
  }
}

export default Users;
