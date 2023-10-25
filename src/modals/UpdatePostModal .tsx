import {
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useToast,
    FormControl,
    Textarea,
    IconButton,
  } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { EditIcon } from "@chakra-ui/icons";

interface UpdateData {
    title: string;
    content: string;
    post_id: number;
}

export default function UpdatePostModal(props: any) {

    const [postUpdateIsOpen, setPostUpdateIsOpen] = useState(false)

    const onOpenProfileUpdate = () => {
        setPostUpdateIsOpen(true)
    }
    const onClose = () => {
        setPostUpdateIsOpen(false)
    }

    const defaultData = {
        title: props.title,
        content: props.content,
        post_id: props.post_id
    }

    const [updateData, setUpdateData] = useState<UpdateData>(defaultData)

    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate = (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        updatePostMutation.mutate({...updateData})
        setIsLoading(false)
        setPostUpdateIsOpen(false)
    }

    const updatePostMutation = useUpdatePost();

    const handleChange = (e: any) => {
        setUpdateData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        }
        
    return (
        <div>
        <IconButton size={'sm'} aria-label='Edit' backgroundColor={'white'} onClick={onOpenProfileUpdate} icon={<EditIcon />}/>
        <Modal isOpen={postUpdateIsOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <form onSubmit={handleUpdate}>
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
                    value={updateData.title} 
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
                    value={updateData.content} 
                    onChange={handleChange}
                    name="content"
                    required/>
                </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="red"  width={'90px'}  onClick={onClose} marginRight={'10px'}>
                Cancel
                </Button>
                <Button colorScheme="blue" width={'90px'} type="submit" isLoading={isLoading}>
                Post
                </Button>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
        </div>
    );
}

function useUpdatePost() {
    const toast = useToast();
    return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async ({ title, content, post_id }: { title: string; content: string; post_id: number }) => {
        try {
        const formData = { title, content };

        const res = await http.put(`/posts/${post_id}`, formData);
        console.log(res)
        if (res.status === 200) {
            toast({
            title: "Update successful!",
            status: "success",
            position: 'top'
            });
        }
        } catch (error: any) {
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
