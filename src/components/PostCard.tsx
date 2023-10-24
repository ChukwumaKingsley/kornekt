import { Box, Text, IconButton, HStack, Spacer, Flex } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import http from '../utils/http';
import { useMutation } from '@tanstack/react-query'

const PostCard = (props: any) => {

  const downvote = async () => {
    await downvoteMutation.mutate(props.post_id);
  };
  
  const vote = async () => {
    await voteMutation.mutate(props.post_id);
  }
  
  const downvoteMutation = usePostDownvote()
  const voteMutation = usePostVote()

  return (
    <Box 
      maxWidth='400px' 
      mb={'20px'}
      bg='white' 
      borderWidth="1px" 
      borderRadius="lg" 
      p="4" shadow="md" 
      key={props.post_id}
      alignSelf={'center'}>
      <Text fontSize="xl" fontWeight="bold">
        {props.title}
      </Text>
      <Text fontSize="md" my="2">
        {props.content}
      </Text>
      <Flex alignItems="center">
        <Text fontSize="sm" color="gray.500">
          Posted by {props.user_name} on {new Date(props.created_at).toLocaleString()}
        </Text>
        <Spacer />
        <HStack spacing={1}>

            <Text>{props.votes_count}</Text>
          <IconButton
            size="sm"
            bg={props.user_voted ? 'blue.300' : 'gray.400'}
            onClick={vote}
            aria-label="Upvote"

            icon={<ChevronUpIcon />}
          />
          <Text>{props.downvotes_count}</Text>
          <IconButton
            size="sm"
            bg={props.user_downvoted ? 'red.300' : 'gray.400'}
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


function usePostDownvote() {
  return useMutation({
    mutationKey: ["downvoting"],
    mutationFn: async (id: any) => {
      try {
        const res = await http.post(`/downvote/${id}`);
        console.log(res)
        return res;
      } catch (error) {
        console.error("Error while downvoting:", error);
        throw new Error("Failed to downvote the post");
      }
    },
  });
}

function usePostVote() {
  return useMutation({
    mutationKey: ["voting"],
    mutationFn: async (id: any) => {
      try {
        const res = await http.post(`/vote/${id}`);
        console.log(res)
        return res;
      } catch (error) {
        console.error("Error while voting:", error);
        throw new Error("Failed to vote the post");
      }
    },
  });
}
  
    
export default PostCard