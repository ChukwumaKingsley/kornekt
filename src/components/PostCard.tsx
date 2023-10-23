import { Box, Text, Badge, IconButton, HStack, Stack, Spacer, Flex } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import http from '../utils/http';
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react';
// import { useMutation } from 'react-query';


export interface PostData {
    post_id: number;
    title: string;
    content: string;
    created_at: string;
    user_name: string;
    vote_count: number;
    downvote_count: number;
  }
  
const PostCard = (props: any) => {

  const [voted, setVoted] = useState(props.user_voted)
  const [downvoted, setDownvoted] = useState(props.user_downvoted)
  // console.log(voted, downvoted)

  // const onVote = () => {

  //   setVoted((prev: boolean) => !prev)
  //   setDownvoted(false)
  // }

  // const onDownvote = () => {
  //   setDownvoted((prev: boolean) => !prev)
  //   setVoted(false)
  // }

  // useEffect(() => {
    
  // }, [voted, downvoted])

  //   const vote = async () => {
  //       try {
  //         const response = await postvote(post.post.post_id);
  //         // Handle the response if needed
  //         console.log(response);
  //       } catch (error) {
  //         console.error("Failed to vote", error);
  //       }
  //     };

    
      const downvote = async () => {
        (await downvoteMutation).mutate(props.post_id)
      };
      const downvoteMutation = usePostDownvote()
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
            bg={voted ? 'blue.300' : 'gray.400'}
            onClick={downvote}
            aria-label="Upvote"

            icon={<ChevronUpIcon />}
          />
          <Text>{props.downvotes_count}</Text>
          <IconButton
            size="sm"
            bg={downvoted ? 'red.300' : 'gray.400'}
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


async function usePostDownvote() {
  return useMutation({
    mutationKey: ["downvoting"],
    mutationFn: async (id: any) => {
      try {
        
        const accessToken = localStorage.getItem('accessToken');
        const res = await http.post(`/vote/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res);
        return res;
      } catch (error: any) {
        console.log(error)
        throw error
      }
    },
  });
}
  
    
export default PostCard