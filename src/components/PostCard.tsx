import { Text, IconButton, HStack, Spacer, Flex, Card, CardHeader, CardBody, Avatar, CardFooter } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import http from '../utils/http';
import { useMutation } from '@tanstack/react-query'
import DeletePost from './DeletePost';

const PostCard = (props: any) => {

  const downvote = async () => {
    await downvoteMutation.mutate(props.post_id);
  };
  
  const vote = async () => {
    await voteMutation.mutate(props.post_id);
  }
  
  const downvoteMutation = usePostDownvote()
  const voteMutation = usePostVote()

  // Don't forget to add code to make posts editable
  
  return (
      <Card maxWidth={'400px'}  width={"90%"} mb={'20px'} alignSelf={'center'}>
        <CardHeader borderBottom={'1px'} borderColor={'gray.300'}>
          <Flex alignItems={'center'} >

            <Avatar size={'sm'} marginRight={'5px'} bg='blue.900' bgSize={'inherit'} src={'hll'} name={props.user_name} />
            <Text fontSize="sm" color="gray.500">
              {props.user_name}
            </Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              {new Date(props.created_at).toLocaleString()}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody borderBottom={'1px'} borderColor={'gray.300'}>
          <Text fontSize="lg" fontWeight="bold">
          {props.title}
          </Text>
          <Text fontSize="md" my="2">
            {props.content}
          </Text>
        </CardBody>
        <CardFooter height={'20px'} alignItems={'center'}>
          {props.is_creator &&  props.is_editable &&
          <IconButton size={'sm'} aria-label='Edit' backgroundColor={'white'} icon={<EditIcon />}/>}
          {props.is_creator && <DeletePost post_id={props.post_id} />}
        <HStack marginLeft={'auto'} spacing={1}>
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
        </CardFooter>
      </Card>
  );
};


function usePostDownvote() {
  return useMutation({
    mutationKey: ["downvoting"],
    mutationFn: async (id: any) => {
      try {
        const res = await http.post(`/downvote/${id}`);
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
        return res;
      } catch (error) {
        console.error("Error while voting:", error);
        throw new Error("Failed to vote the post");
      }
    },
  });
}
    
export default PostCard