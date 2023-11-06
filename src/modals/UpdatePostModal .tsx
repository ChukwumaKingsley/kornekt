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
    Flex,
    FormLabel,
    Switch,
  } from "@chakra-ui/react";
import { useState } from "react";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import http from "../utils/http";
import { EditIcon } from "@chakra-ui/icons";

interface UpdateData {
    title: string;
    content: string;
    post_id: number;
    published: boolean;
}

interface UpdateProps {
    post_id: number;
    title: string;
    updateTitle: (newContent: string) => void;
    content: string;
    updateContent: (newContent: string) => void;
    draft: boolean;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}


export default function UpdatePostModal(props: UpdateProps) {

    const [postUpdateIsOpen, setPostUpdateIsOpen] = useState(false)

    const onOpenProfileUpdate = () => {
        setPostUpdateIsOpen(true)
    }
    const onClose = () => {
        props.refetch()
        setPostUpdateIsOpen(false)
    }

    const defaultData = {
        title: props.title,
        content: props.content,
        post_id: props.post_id,
        published: !props.draft
    }

    const [updateData, setUpdateData] = useState<UpdateData>(defaultData)

    const [isLoading, setIsLoading] = useState(false)

    const handleUpdate = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        await updatePostMutation.mutate({...updateData})
        props.updateTitle(updateData.title)
        props.updateContent(updateData.content)
        setIsLoading(false)
        props.refetch()
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
            <ModalHeader textAlign={'center'}>Edit {props.draft ? "Draft" : "Post"}</ModalHeader>
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
                <FormControl>
            {props.draft &&
            <Flex alignContent={'center'}>
                <FormLabel textAlign={'center'}>Post?</FormLabel>
                <Switch
                    id="flip-switch"
                    size="md"
                    colorScheme="blue" 
                    isChecked={updateData.published}
                    onChange={() => {setUpdateData((prev) => ({...prev, published: !updateData.published}))}}
                />
            </Flex>
            }
            </FormControl>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme="red"  width={'90px'}  onClick={onClose} marginRight={'10px'}>
                Cancel
                </Button>
                <Button colorScheme="blue" width={'90px'} type="submit" isLoading={isLoading}>
                {updateData.published ? 'Post' : 'Save'}
                </Button>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
        </div>
    );
}

export function useUpdatePost() {
    const toast = useToast();
    return useMutation({
    mutationKey: ["updatePost"],
    mutationFn: async ({ title, content, post_id, published }: { title: string; content: string; post_id: number, published: boolean }) => {
        try {
        const formData = { title, content, published };
        const accessToken = localStorage.getItem('accessToken')

        const res = await http.put(`/posts/${post_id}`, formData, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
        if (res.status === 200) {
            toast({
            title: "Successful!",
            status: "success",
            position: 'top'
            });
        }
        return res.status
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
            return error.response.status
        }
    },
    });
}
