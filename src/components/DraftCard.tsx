import { Text, Spacer, Flex, Card, CardHeader, CardBody, Avatar, CardFooter, Button } from '@chakra-ui/react';
import DeletePost from './DeletePost';
import UpdatePostModal, { useUpdatePost } from '../modals/UpdatePostModal ';
import { useState } from 'react';
import { CardTypes } from './PostCard';



const DraftCard = (props: CardTypes) => {

  const [isLoading, setIsLoading] = useState(false)
  const updateData = {
    title: props.title,
    content: props.content,
    post_id: props.post_id,
    published: true
}

  const handlePost = async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      await updatePostMutation.mutate({...updateData})
      props.refetch()
      setIsLoading(false)
  }

  const updatePostMutation = useUpdatePost();

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
          <UpdatePostModal 
            post_id={props.post_id}
            title={props.title}
            content={props.content}
            draft={true} 
            refetch={props.refetch}
          />
          <DeletePost post_id={props.post_id} refetch={props.refetch} />
          <Spacer />
          <Button 
            height={'30px'} 
            colorScheme='blue' 
            onClick={handlePost}
            isLoading={isLoading}
          >
            Post
          </Button>
        </CardFooter>
      </Card>
  );
};

export default DraftCard