import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Posts() {
  const toast = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => fetchData(toast, navigate, search),
  });
  
  const handleSearchChange = (e: any) => {
    refetch()
    setSearch(e.target.value)
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    console.log("Search button clicked");
    refetch()
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }



  // Data is available here
  return (
      <Flex maxHeight={'100svh'} flexDirection={'column'}>
          <Box alignSelf={'center'}>
            <form onSubmit={handleSearch}>
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
            </form>
          </Box>
          <Flex overflowY={"auto"} flexDirection={"column"}>
          {data.map((post: any) => 
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
            />)}
            </Flex>
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

export default Posts;
