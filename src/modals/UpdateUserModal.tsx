import {
  Box,
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
} from "@chakra-ui/react";
import { useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UserProfile } from "../hooks/useMyProfile";


interface UpdateProps {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<UserProfile, Error>>
}

export default function UpdateUserModal({onClose, isOpen, refetch}: UpdateProps) {

  const toast = useToast()
  const [newName, setNewName] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    updateMutation.mutate({name: newName})
    refetch
  }
  const onUpdateSuccess = () => {
    toast({
      title: "Name Update successful!",
      status: "success",
      position: "top",
      duration: 3000
    });
    setIsLoading(false)
    refetch()
    onClose()
    setNewName('')
  }

  const onUpdateFail =() => {
    setIsLoading(false)
  }

  const updateMutation = useUpdateUser({onUpdateSuccess, onUpdateFail});
  
  const handleChange = (e: any) => {
    setNewName(e.target.value)
  }
  
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleUpdate}>
          <ModalHeader textAlign={'center'}>Update user information</ModalHeader>
          <ModalBody>
            <Box p={4}>
              <FormLabel>Name:</FormLabel>
              <Input placeholder="Enter new name" size="lg" mb={4} value={newName} onChange={handleChange} required/>
            </Box>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme="red"  width={'90px'}  onClick={onClose} marginRight={'10px'}>
              Cancel
            </Button>
            <Button colorScheme="blue" width={'90px'} type="submit" isLoading={isLoading}>
              Update
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
