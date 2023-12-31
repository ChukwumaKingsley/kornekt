import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Box, Button, Flex, Heading, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DraftCard from "../components/DraftCard";

function Drafts() {
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => fetchData(toast, navigate, search),
  });
  const handleSearchChange = async (e: any) => {
    setSearch(e.target.value)
    await refetch()
  }
  const handleSearch = async (e: any) => {
    e.preventDefault()
    await refetch()
  }

  return (
      <Flex maxHeight={'100svh'} flexDirection={'column'}>
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
          {!isLoading && !isError && <Flex overflowY={!isLoading ? 'auto' : 'unset'} flexDirection={"column"}>
          {data.length > 0 && data.map((post: any) => 
            <DraftCard 
              key={post.id}
              post_id={post.id}
              user_name={post.user_name}
              title={post.title}
              content={post.content}
              created_at={post.created_at}
              votes_count={post.votes}
              downvotes_count={post.downvotes}
              user_voted={post.user_voted}
              user_downvoted={post.user_downvoted}
              is_creator={true} 
              is_editable={true} 
              refetch={refetch}
              user_id={post.user_id}
              profile_pic={post.profile_pic} 
            />)}
            {data.length === 0 && <Heading as='h2' mt='50px' alignSelf={'center'} textColor={'blue.400'} >No Drafts</Heading>}
            </Flex>}
            {isError && <Text fontSize={'24px'} alignSelf={"center"} justifySelf={'center'}>Can't retrieve drafts at the moment</Text>}
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
    const response = await http.get(`/posts/drafts?search=${search}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
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

export default Drafts;
