import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormLabel,
    useToast,
    FormControl,
    Textarea,
    Switch,
    Flex,
  } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";

  
interface UpdateProps {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean
}

interface PostData {
    title: string;
    content: string;
    published: boolean;
}

interface FailorSuccess {
    onUpdateSuccess: () => void,
    onUpdateFail: () => void
  }

export default function CreatePostModal({onClose, isOpen}: UpdateProps) {

const defaultData = {
    title: '',
    content: '',
    published: true
}

const [postData, setPostData] = useState<PostData>(defaultData)

const [isLoading, setIsLoading] = useState(false)

const handCreate = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    CreatePostMutation.mutate({...postData})
}
const onUpdateSuccess = () => {
    setIsLoading(false)
    setTimeout(function() {
    onClose()
    }, 300)
    setPostData(defaultData)
}

const onUpdateFail = () => {
    setIsLoading(false)
}

const CreatePostMutation = useMakePost({onUpdateSuccess, onUpdateFail});

const handleChange = (e: any) => {
    setPostData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    }
    
return (
    <div>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={handCreate}>
        <ModalHeader textAlign={'center'}>Create Post</ModalHeader>
        <ModalBody>
            <FormControl p={4}>
            {/* <FormLabel>Title:</FormLabel> */}
            <Input 
                placeholder="Title" 
                size="lg"
                type="text"
                mb={'5px'}
                maxLength={50}
                value={postData.title} 
                onChange={handleChange}
                name="title"
                required/>
            </FormControl>
            <FormControl p={4}>
            <Textarea 
                placeholder="Content" 
                size="lg"
                height={'100px'}
                maxLength={400}
                mb={4} 
                value={postData.content} 
                onChange={handleChange}
                name="content"
                required/>
            </FormControl>
            <FormControl>
            <Flex alignContent={'center'}>
                <FormLabel textAlign={'center'}>Save to drafts?</FormLabel>
                <Switch
                    id="flip-switch"
                    size="md"
                    colorScheme="blue" 
                    isChecked={!postData.published}
                    onChange={() => {setPostData((prev) => ({...prev, published: !postData.published}))}}
                />
            </Flex>
            </FormControl>
        </ModalBody>
        <ModalFooter>
        <Button colorScheme="red"  width={'90px'}  onClick={onClose} marginRight={'10px'}>
            Cancel
            </Button>
            <Button colorScheme="blue" width={'90px'} type="submit" isLoading={isLoading}>
            {postData.published ? 'Post' : 'Save'}
            </Button>
        </ModalFooter>
        </form>
        </ModalContent>
    </Modal>
    </div>
);
}

function useMakePost({onUpdateSuccess, onUpdateFail}: FailorSuccess) {
const toast = useToast();
return useMutation({
mutationKey: ["makePost"],
mutationFn: async ({ title, content, published }: { title: string; content: string; published: boolean }) => {
    try {
    const formData = { title, content, published };

    const res = await http.post("/posts", formData);
    console.log(res)
    if (res.status === 201) {
        toast({
        title: "Post successful!",
        status: "success",
        position: 'top'
        });
        onUpdateSuccess();
    }
    } catch (error: any) {
    onUpdateFail()
    if (error.response) {
        // The request was made, but the server responded
        if (error.response.status === 400) {
        toast({
            title: "User with this email already exists",
            status: "error",
            position: 'top'
        });
    } else if (error.response.status === 422) {
        toast({
            title: "Invalid email address",
            status: "warning",
            position: 'top',
            });
    }else {
        // Handle other types of errors or exceptions
        // For example, network error
        console.error("Error:", error);
    }
        }
    }
},
onSuccess: (data) => console.log("Success data", data),
});
}
