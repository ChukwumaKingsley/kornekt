import { Box, Text, Badge, IconButton, HStack, Stack, Spacer, Flex } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import http from '../utils/http';
import { useQuery } from '@tanstack/react-query'


export interface PostData {
    post_id: number;
    title: string;
    content: string;
    created_at: string;
    user_name: string;
    vote_count: number;
    downvote_count: number;
  }
  
const Post = (post: any) => {

    const vote = async () => {
        try {
          const response = await postvote(post.post.post_id);
          // Handle the response if needed
          console.log(response);
        } catch (error) {
          console.error("Failed to vote", error);
        }
      };
    
      const downvote = async () => {
        try {
          const response = await postdownvote(post.post.post_id);
          // Handle the response if needed
          console.log(response);
        } catch (error) {
          console.error("Failed to downvote", error);
        }
      };
  return (
    <Box 
      maxWidth='400px' 
      mb={'20px'}
      bg='white' 
      borderWidth="1px" 
      borderRadius="lg" 
      p="4" shadow="md" 
      key={post.post_id} 
      alignSelf={'center'}>
      <Text fontSize="xl" fontWeight="bold">
        {post.post.title}
      </Text>
      <Text fontSize="md" my="2">
        {post.post.content}
      </Text>
      <Flex alignItems="center">
        <Text fontSize="sm" color="gray.500">
          Posted by {post.post.user_name} on {new Date(post.post.created_at).toLocaleString()}
        </Text>
        <Spacer />
        <HStack spacing={1}>

            <Text>{post.post.votes}</Text>
          <IconButton
            size="sm"
            bg={post.post.user_voted ? 'blue.300' : 'gray.400'}
            onClick={vote}
            aria-label="Upvote"

            icon={<ChevronUpIcon />}
          />
          <Text>{post.post.downvotes}</Text>
          <IconButton
            size="sm"
            bg={post.post.user_downvoted ? 'red.300' : 'gray.400'}
            onClick={downvote}
            aria-label="Downvote"
            icon={<ChevronDownIcon />}
          >
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
};

async function postvote(id: any) {
    try {
      const accessToken = localStorage.getItem('accessToken')
      console.log(accessToken)
  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
  
      const response = await http.post(`/vote/${id}`, { headers, } ); // Replace with your API endpoint
      console.log(response)
      return response.data;
    } catch (error) {
        console.log(error)
      throw new Error("Failed to vote");
    }
  }

  async function postdownvote(id: any) {
    try {
      const accessToken = localStorage.getItem('accessToken')  
      if (!accessToken) {
        throw new Error("Access token not found");
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
  
      const response = await http.post(`/downvote/${id}`, { headers }); // Replace with your API endpoint
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error("Failed to vote");
    }
  }

export default Post;


