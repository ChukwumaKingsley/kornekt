import { Text, Spacer, Card, CardBody, CardFooter, Button } from '@chakra-ui/react';
import DeletePost from './DeletePost';
import UpdatePostModal, { useUpdatePost } from '../modals/UpdatePostModal ';
import { useState } from 'react';
import { CardTypes } from './PostCard';



const DraftCard = (props: CardTypes) => {

  const [show, setShow] = useState(true)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)

  const updateContent = (newContent: string) => {setContent(newContent)}
  const updateTitle = (newTitle: string) => {setTitle(newTitle)}

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
      setShow(false)
      setIsLoading(false)
  }

  const updatePostMutation = useUpdatePost();

  // Don't forget to add code to make posts editable
  
  return (
      show && <Card maxWidth={'800px'}  width={"90%"} mb={'20px'} alignSelf={'center'}>
        <CardBody borderBottom={'1px'} borderColor={'gray.300'}>
          <Text fontSize="lg" fontWeight="bold">
          {title}
          </Text>
          <Text fontSize="md" my="2">
            {content}
          </Text>
        </CardBody>
        <CardFooter height={'20px'} alignItems={'center'}>
          <UpdatePostModal 
            post_id={props.post_id}
            title={title}
            updateTitle={updateTitle}
            content={content}
            updateContent={updateContent}
            draft={true} 
            refetch={props.refetch}
          />
          <DeletePost post_id={props.post_id} refetch={props.refetch} setShow={setShow}/>
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