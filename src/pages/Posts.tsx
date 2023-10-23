import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Flex, useToast } from "@chakra-ui/react";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function Posts() {
  const toast = useToast()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => fetchData(toast, navigate),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Data is available here
  return (
    <Flex maxHeight={'100svh'} flexDirection={'column'}>
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
  );
}

// Define a function to fetch the data
async function fetchData(toast: any, navigate: any) {
  const accessToken = localStorage.getItem('accessToken')
  try {
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await http.get("/posts", { headers });

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
