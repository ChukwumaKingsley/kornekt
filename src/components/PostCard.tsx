import { Text, IconButton, HStack, Spacer, Flex, Card, CardHeader, CardBody, Avatar, CardFooter } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import http from '../utils/http';
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import DeletePost from './DeletePost';
import UpdatePostModal from '../modals/UpdatePostModal ';
import { useState } from 'react';


export interface CardTypes {
  post_id: number;
  user_name: string;
  title: string;
  content: string;
  created_at: string;
  votes_count: number;
  downvotes_count: number;
  user_voted: boolean;
  user_downvoted: boolean;
  is_creator: boolean;
  is_editable: boolean;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}

const PostCard = (props: CardTypes) => {

  const [liked, setLiked] = useState(props.user_voted)
  const [disliked, setDisLiked] = useState(props.user_downvoted)
  const [likecount, setLikeCount] = useState(props.votes_count)
  const [dislikeCount, setDislikecount] = useState(props.downvotes_count)

  const downvote = () => {
    if (liked) {
      setLiked(false)
      setLikeCount(prev => prev-1)
    }
    if (disliked) {
      setDisLiked(false)
      setDislikecount(prev => prev - 1)
    } else {
      setDisLiked(true)
      setDislikecount(prev => prev + 1)
    }
    downvoteMutation.mutate(props.post_id);
    props.refetch();
  };

  const [show, setShow] = useState(true)
  
  const vote = () => {
    if (disliked) {
      setDisLiked(false)
      setDislikecount(prev => prev-1)
    }
    if (liked) {
      setLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
    voteMutation.mutate(props.post_id)
    props.refetch()
  }
  
  const downvoteMutation = usePostDownvote()
  const voteMutation = usePostVote()

  // Don't forget to add code to make posts editable
  
  return (
      show && <Card maxWidth={'800px'}  width={"90%"} mb={'20px'} alignSelf={'center'}>
        <CardHeader borderBottom={'1px'} borderColor={'gray.300'}>
          <Flex alignItems={'center'} >

            <Avatar size={'sm'} marginRight={'5px'} bg='blue.900' bgSize={'inherit'} src={'hll'} name={props.user_name} />
            <Text fontSize="sm" color="gray.500">
              {props.user_name}
            </Text>
            <Spacer />
            <Text fontSize="sm" color="gray.500" textAlign={'right'}>
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
          {
            props.is_creator &&  props.is_editable &&
            <UpdatePostModal 
              post_id={props.post_id}
              title={props.title} 
              content={props.content} 
              draft={false}
              refetch={props.refetch}
            />
          }
          {
            props.is_creator && 
            <DeletePost post_id={props.post_id} refetch={props.refetch} setShow={setShow}/>
          }
        <HStack marginLeft={'auto'} spacing={1}>
          <Text>{likecount}</Text>
          <IconButton
          size="sm"
          bg={liked ? 'blue.300' : 'gray.400'}
          onClick={vote}
          aria-label="Upvote"

          icon={<ChevronUpIcon />}
          />
          <Text>{dislikeCount}</Text>
          <IconButton
          size="sm"
          bg={disliked ? 'red.300' : 'gray.400'}
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
      const accessToken = localStorage.getItem("accessToken")
      try {
        const res = await http.post(`/downvote/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
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
        const accessToken = localStorage.getItem("accessToken")
        const res = await http.post(`/vote/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        return res;
      } catch (error) {
        console.error("Error while voting:", error);
        throw new Error("Failed to vote the post");
      }
    },
  });
}
    
export default PostCard