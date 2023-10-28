import { DeleteIcon } from "@chakra-ui/icons";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, IconButton, useToast } from "@chakra-ui/react";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import http from "../utils/http";

interface DeleteProps {
  post_id: number;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}

export default function DeletePost(props: DeleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: any = useRef();

  const handleClick = () => {
    setIsOpen(true);
  }

  const handleDelete = async() => {
    await postDeleteMutation.mutate(props.post_id)
    props.refetch()
    onClose();
  }

  const postDeleteMutation = usePostDelete()

  return (
    <>
      <IconButton size={'sm'} aria-label='Delete' backgroundColor={'white'} onClick={handleClick} icon={<DeleteIcon />} />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Confirm delete</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function usePostDelete() {
  const toast = useToast()
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id: any) => {
      try {
        const res = await http.delete(`/posts/${id}`);
        toast({
          title: "Post deleted!",
          colorScheme: 'gray',
          position: 'top',
        });
        return res.status;
      } catch (error) {
        console.error("Error while voting:", error);
        throw new Error("Failed to vote the post");
      }
    },
  });
}