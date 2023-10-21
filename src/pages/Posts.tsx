import { useQuery } from "@tanstack/react-query";
import http from "../utils/http";
import { Flex } from "@chakra-ui/react";
import Post, { PostData } from "../components/PostCard";

function Posts() {
  const { data, isLoading, isError, error } = useQuery({queryKey:[ "myData"], queryFn: fetchData});
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Data is available here
  return (
    <Flex maxHeight={'100'} flexDirection={'column'}>
      {data.map((data: any) => 
        <Post key={data.post_id} post={data} />)}
    </Flex>
  );
}

// Define a function to fetch the data
async function fetchData() {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };


    const response = await http.get("/posts", { headers }); // Replace with your API endpoint
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default Posts;
