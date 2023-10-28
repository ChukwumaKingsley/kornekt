import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Box, Button, Flex, Heading, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Posts() {
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => fetchData(toast, navigate, search),
  });

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
    refetch()
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    refetch()
  }



  // Data is available here
  return (
      <Flex mt='20px' maxHeight={'100svh'} overflowY={"auto"} flexDirection={'column'}>
          <Box alignSelf={'center'}>
            <form onSubmit={handleSearch}>
              <Flex>
                <Input 
                  type="text" 
                  placeholder="Search" 
                  width='300px' 
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
          {!isLoading && !isError && <Flex overflowY={"auto"} flexDirection={"column"}>
          {data.length > 0 && data.map((post: any) => 
            <PostCard 
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
            is_creator={post.is_creator}
            is_editable={post.is_editable}
            refetch={refetch}
            />)}
            {data.length === 0 && <Heading as='h2' mt='50px' alignSelf={'center'} textColor={'blue.400'} >No Posts</Heading>}
            </Flex>}
            {isError && <Text fontSize={'24px'} alignSelf={"center"} justifySelf={'center'}>Can't retrieve posts at the moment</Text>}
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
    const response = await http.get(`/posts?search=${search}`);
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

export default Posts;
